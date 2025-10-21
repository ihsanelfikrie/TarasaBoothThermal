import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import useTarasaStore from '@/store/useTarasaStore'

export default function ResultPage() {
  const router = useRouter()

  // Get state dari Zustand
  const qrUrl = useTarasaStore((state) => state.qrUrl)
  const downloadUrl = useTarasaStore((state) => state.downloadUrl)
  const resetAll = useTarasaStore((state) => state.resetAll)

  // Redirect jika belum ada hasil
  useEffect(() => {
    if (!qrUrl) {
      router.push('/template')
    }
  }, [qrUrl, router])

  const handlePhotoAgain = () => {
    // Reset semua state
    resetAll()
    // Kembali ke halaman template
    router.push('/template')
  }

  if (!qrUrl) {
    return null
  }

  return (
    <>
      <Head>
        <title>TarasaBooth - Selesai!</title>
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-center bg-retro-bg p-4 md:p-8">
        <div className="box-retro max-w-2xl w-full p-8 md:p-12 text-center fade-in">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="text-6xl mb-4">✓</div>
            <h1 className="text-pixel text-xl md:text-2xl mb-2">
              FOTO BERHASIL
            </h1>
            <p className="text-pixel-alt text-sm text-retro-gray">
              Foto Anda sudah dicetak!
            </p>
          </div>

          {/* QR Code Section */}
          <div className="box-retro p-6 bg-white mb-6">
            <div className="text-pixel-alt text-base mb-4">
              PINDAI UNTUK SIMPAN
            </div>
            
            {qrUrl && (
              <div className="relative w-64 h-64 mx-auto mb-4">
                <Image
                  src={qrUrl}
                  alt="QR Code"
                  fill
                  className="object-contain"
                />
              </div>
            )}

            <div className="text-xs text-retro-gray">
              Arahkan kamera HP ke QR Code di atas
            </div>
          </div>

          {/* Info */}
          <div className="box-retro p-4 mb-6 bg-retro-light">
            <div className="text-xs md:text-sm text-retro-gray space-y-2">
              <div>📷 Foto tersimpan di galeri printer</div>
              <div>📱 Scan QR untuk download ke HP</div>
              <div>🖨️ Ambil cetakan Anda di printer</div>
            </div>
          </div>

          {/* Thank You Message */}
          <div className="mb-8">
            <div className="text-pixel text-2xl md:text-3xl mb-4">
              TERIMA KASIH!
            </div>
            <div className="flex justify-center gap-2">
              <div className="w-3 h-3 bg-retro-dark"></div>
              <div className="w-3 h-3 bg-retro-dark"></div>
              <div className="w-3 h-3 bg-retro-dark"></div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={handlePhotoAgain}
              className="btn-retro w-full py-4 bg-retro-dark text-retro-bg hover:bg-retro-gray text-lg"
            >
              FOTO LAGI! 📷
            </button>

            {downloadUrl && (
              <a
                href={downloadUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="btn-retro block w-full py-3 text-sm"
              >
                DOWNLOAD LANGSUNG
              </a>
            )}
          </div>

          {/* Footer */}
          <div className="mt-8 text-xs text-retro-gray">
            © 2025 TARASABOOTH v1.0
          </div>
        </div>
      </main>
    </>
  )
}

// KUSTOMISASI:
// 1. Success message - ganti teks dan emoji
// 2. QR Code size - ubah ukuran
// 3. Info section - tambah/ubah informasi
// 4. Thank you message - personalisasi
// 5. Countdown auto-redirect (opsional)