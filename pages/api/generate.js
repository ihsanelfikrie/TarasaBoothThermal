import sharp from 'sharp'
import qrcode from 'qrcode'
import fs from 'fs'
import path from 'path'

// Konfigurasi
const PRINTER_WIDTH = 576 // Lebar untuk thermal printer 58mm
const PHOTO_HEIGHT = 300 // Tinggi setiap foto
const HEADER_HEIGHT = 100
const FOOTER_HEIGHT = 100

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { images, template, header, footer } = req.body

    // Validasi input
    if (!images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ message: 'Images required' })
    }

    console.log(`🎨 Processing ${images.length} images...`)

    // 1. Decode base64 images
    const imageBuffers = images.map((imgBase64) => {
      const base64Data = imgBase64.replace(/^data:image\/\w+;base64,/, '')
      return Buffer.from(base64Data, 'base64')
    })

    // 2. Process setiap gambar (resize, grayscale, dithering)
    const processedImages = await Promise.all(
      imageBuffers.map(async (buffer) => {
        return await sharp(buffer)
          .resize(PRINTER_WIDTH, PHOTO_HEIGHT, {
            fit: 'cover',
            position: 'center',
          })
          .grayscale()
          .normalise() // Meningkatkan kontras
          .toBuffer()
      })
    )

    console.log('✅ Images processed')

    // 3. Hitung tinggi total strip
    const photoCount = template === 'single' ? 1 : 3
    const totalHeight = HEADER_HEIGHT + FOOTER_HEIGHT + (PHOTO_HEIGHT * photoCount)

    // 4. Buat canvas kosong
    let finalImage = sharp({
      create: {
        width: PRINTER_WIDTH,
        height: totalHeight,
        channels: 3,
        background: { r: 240, g: 232, b: 208 }, // #F0E8D0
      },
    })

    // 5. Siapkan komposisi (header, foto-foto, footer)
    const compositeArray = []
    let currentY = 0

    // Header (jika ada file)
    const headerPath = path.join(process.cwd(), 'public', 'assets', 'headers', header)
    if (fs.existsSync(headerPath)) {
      compositeArray.push({
        input: headerPath,
        top: currentY,
        left: 0,
      })
    } else {
      // Fallback: buat header simple
      const headerBuffer = await sharp({
        create: {
          width: PRINTER_WIDTH,
          height: HEADER_HEIGHT,
          channels: 3,
          background: { r: 240, g: 232, b: 208 },
        },
      })
        .png()
        .toBuffer()

      compositeArray.push({
        input: headerBuffer,
        top: currentY,
        left: 0,
      })
    }
    currentY += HEADER_HEIGHT

    // Tambahkan foto-foto
    for (let i = 0; i < photoCount; i++) {
      compositeArray.push({
        input: processedImages[i],
        top: currentY,
        left: 0,
      })
      currentY += PHOTO_HEIGHT
    }

    // Footer (jika ada file)
    const footerPath = path.join(process.cwd(), 'public', 'assets', 'footers', footer)
    if (fs.existsSync(footerPath)) {
      compositeArray.push({
        input: footerPath,
        top: currentY,
        left: 0,
      })
    } else {
      // Fallback: buat footer simple
      const footerBuffer = await sharp({
        create: {
          width: PRINTER_WIDTH,
          height: FOOTER_HEIGHT,
          channels: 3,
          background: { r: 240, g: 232, b: 208 },
        },
      })
        .png()
        .toBuffer()

      compositeArray.push({
        input: footerBuffer,
        top: currentY,
        left: 0,
      })
    }

    // 6. Gabungkan semua
    const finalImageBuffer = await finalImage
      .composite(compositeArray)
      .jpeg({ quality: 90 })
      .toBuffer()

    console.log('✅ Final image composed')

    // 7. Simpan file
    const fileName = `tarasabooth_${Date.now()}.jpg`
    const outputDir = path.join(process.cwd(), 'public', 'generated')

    // Buat folder jika belum ada
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    const filePath = path.join(outputDir, fileName)
    fs.writeFileSync(filePath, finalImageBuffer)

    console.log(`✅ Saved: ${fileName}`)

    // 8. Buat QR Code
    // PENTING: Ganti dengan IP laptop Anda!
    const serverIP = process.env.NEXT_PUBLIC_SERVER_IP || 'http://localhost:3000'
    const fileUrl = `${serverIP}/generated/${fileName}`
    const qrDataUrl = await qrcode.toDataURL(fileUrl, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#F0E8D0',
      },
    })

    console.log('✅ QR Code generated')

    // 9. TODO: Kirim ke printer (akan ditambahkan nanti)
    // await printToThermalPrinter(finalImageBuffer)

    // 10. Kirim response
    res.status(200).json({
      success: true,
      qrUrl: qrDataUrl,
      downloadUrl: fileUrl,
      fileName,
    })

    console.log('🎉 Request completed successfully')
  } catch (error) {
    console.error('❌ Error:', error)
    res.status(500).json({
      success: false,
      message: 'Gagal memproses atau mencetak',
      error: error.message,
    })
  }
}

// Konfigurasi Next.js API
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Increase limit untuk base64 images
    },
  },
}

// KUSTOMISASI:
// 1. PRINTER_WIDTH - sesuaikan dengan printer Anda
// 2. PHOTO_HEIGHT - ubah proporsi foto
// 3. Quality JPEG - ubah nilai quality
// 4. Dithering algorithm - tambah threshold atau ordered dithering
// 5. Tambahkan watermark atau text overlay