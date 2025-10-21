import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import useTarasaStore from '@/store/useTarasaStore'

export default function SelectPage() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState(null)

  // Get state dari Zustand
  const template = useTarasaStore((state) => state.template)
  const capturedPhotos = useTarasaStore((state) => state.capturedPhotos)
  const selectedPhotos = useTarasaStore((state) => state.selectedPhotos)
  const toggleSelectedPhoto = useTarasaStore((state) => state.toggleSelectedPhoto)
  const header = useTarasaStore((state) => state.header)
  const footer = useTarasaStore((state) => state.footer)
  const setQrUrl = useTarasaStore((state) => state.setQrUrl)
  const setDownloadUrl = useTarasaStore((state) => state.setDownloadUrl)

  // Redirect jika belum ambil foto
  useEffect(() => {
    if (!template || capturedPhotos.length === 0) {
      router.push('/template')
    }
  }, [template, capturedPhotos, router])

  // Tentukan jumlah foto yang perlu dipilih
  const requiredSelection = template === 'single' ? 1 : 3
  const isSelectionComplete = selectedPhotos.length === requiredSelection

  // Handle klik foto
  const handlePhotoClick = (index) => {
    toggleSelectedPhoto(index)
  }

  // Handle proses & cetak
  const handleProcessAndPrint = async () => {
    if (!isSelectionComplete) return

    setIsProcessing(true)
    setError(null)

    try {
      // Ambil foto yang dipilih berdasarkan index
      const selectedImages = selectedPhotos.map(index => capturedPhotos[index])

      // Kirim ke API
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          images: selectedImages,
          template,
          header: `${header}.png`,
          footer: `${footer}.png`,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Gagal memproses gambar')
      }

      const data = await response.json()

      // Simpan hasil ke store
      setQrUrl(data.qrUrl)
      setDownloadUrl(data.downloadUrl)

      // Redirect ke halaman result
      router.push('/result')
    } catch (err) {
      console.error('Error processing:', err)
      setError(err.message)
      setIsProcessing(false)
    }
  }

  if (!template || capturedPhotos.length === 0) {
    return null
  }

  return (
    <>
      <Head>
        <title>TarasaBooth - Pilih Foto</title>
      </Head>

      <main className="min-h-screen bg-retro-bg p-4 md:p-8">
        <div className="max-w-4xl mx-auto fade-in">
          {/* Header Info */}
          <div className="box-retro p-4 mb-6 text-center">
            <h1 className="text-pixel text-lg md:text-xl mb-3">
              {template === 'single' ? 'PILIH 1 FOTO' : 'PILIH 3 FOTO'}
            </h1>
            <div className="text-xs md:text-sm text-retro-gray mb-2">
              Klik foto untuk memilih
            </div>
            <div className="text-pixel-alt text-sm">
              Terpilih: {selectedPhotos.length} / {requiredSelection}
            </div>
          </div>

          {/* Galeri Foto */}
          <div className="box-retro p-4 md:p-6 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {capturedPhotos.map((photo, index) => {
                const isSelected = selectedPhotos.includes(index)
                const selectionOrder = selectedPhotos.indexOf(index)

                return (
                  <button
                    key={index}
                    onClick={() => handlePhotoClick(index)}
                    className={`relative aspect-square overflow-hidden transition-all ${
                      isSelected
                        ? 'border-retro-thick border-retro-dark scale-95'
                        : 'border-retro border-retro-gray hover:border-retro-dark'
                    }`}
                  >
                    <Image
                      src={photo}
                      alt={`Foto ${index + 1}`}
                      fill
                      className="object-cover"
                      style={{ imageRendering: 'pixelated' }}
                    />

                    {/* Overlay jika terpilih */}
                    {isSelected && (
                      <div className="absolute inset-0 bg-retro-dark bg-opacity-30 flex items-center justify-center">
                        <div className="bg-retro-dark text-retro-bg text-2xl md:text-3xl font-bold w-12 h-12 md:w-16 md:h-16 flex items-center justify-center border-retro border-retro-bg">
                          {selectionOrder + 1}
                        </div>
                      </div>
                    )}

                    {/* Nomor foto di pojok */}
                    <div className="absolute top-2 left-2 bg-retro-bg text-retro-dark text-xs px-2 py-1 border border-retro-dark">
                      #{index + 1}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="box-retro p-4 mb-6 bg-red-100 border-red-500 text-center">
              <div className="text-pixel-alt text-sm text-red-700 mb-2">
                ⚠️ ERROR
              </div>
              <div className="text-xs text-red-600">{error}</div>
            </div>
          )}

          {/* Loading State */}
          {isProcessing && (
            <div className="box-retro p-8 mb-6 text-center">
              <div className="text-pixel-alt text-lg mb-4">
                MENCETAK<span className="blink">_</span>
              </div>
              <div className="text-xs text-retro-gray">
                Mohon tunggu, sedang memproses gambar...
              </div>
              <div className="mt-4">
                <div className="box-retro p-2 bg-retro-light">
                  <div className="h-4 bg-retro-dark animate-pulse"></div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 justify-between">
            <button
              onClick={() => router.back()}
              disabled={isProcessing}
              className="btn-retro px-6 py-3"
            >
              &lt; KEMBALI
            </button>

            <button
              onClick={handleProcessAndPrint}
              disabled={!isSelectionComplete || isProcessing}
              className={`btn-retro px-8 py-3 ${
                isSelectionComplete && !isProcessing
                  ? 'bg-retro-dark text-retro-bg hover:bg-retro-gray'
                  : ''
              }`}
            >
              {isProcessing ? 'MEMPROSES...' : 'PROSES & CETAK'}
            </button>
          </div>
        </div>
      </main>
    </>
  )
}

// KUSTOMISASI:
// 1. requiredSelection - ubah jumlah foto
// 2. Grid layout - ubah dari 2/3 kolom
// 3. Selection indicator - ganti angka dengan icon
// 4. Loading animation - custom animation
// 5. Error handling - tambah retry button