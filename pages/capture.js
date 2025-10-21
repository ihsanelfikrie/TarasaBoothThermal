import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Head from 'next/head'
import useTarasaStore from '@/store/useTarasaStore'
import Camera from '@/components/Camera'
import Image from 'next/image'

export default function CapturePage() {
  const router = useRouter()

  // Get state dari Zustand
  const template = useTarasaStore((state) => state.template)
  const capturedPhotos = useTarasaStore((state) => state.capturedPhotos)
  const previewEffect = useTarasaStore((state) => state.previewEffect)
  const addPhoto = useTarasaStore((state) => state.addPhoto)
  const cycleEffect = useTarasaStore((state) => state.cycleEffect)

  // Redirect jika belum pilih template
  useEffect(() => {
    if (!template) {
      router.push('/template')
    }
  }, [template, router])

  // Tentukan jumlah foto yang perlu diambil
  const requiredPhotos = template === 'single' ? 3 : 6
  const isComplete = capturedPhotos.length >= requiredPhotos

  const handleCapture = (imageBase64) => {
    addPhoto(imageBase64)
    
    // Sound effect (opsional)
    // new Audio('/sounds/camera-shutter.mp3').play()
  }

  const handleContinue = () => {
    if (isComplete) {
      router.push('/select')
    }
  }

  if (!template) {
    return null
  }

  return (
    <>
      <Head>
        <title>TarasaBooth - Ambil Foto</title>
      </Head>

      <main className="min-h-screen bg-retro-bg p-4 md:p-8">
        <div className="max-w-4xl mx-auto fade-in">
          {/* Header Info */}
          <div className="box-retro p-4 mb-4 text-center">
            <div className="text-pixel-alt text-sm md:text-base mb-2">
              {template === 'single' 
                ? 'AMBIL 3 FOTO, PILIH 1' 
                : 'AMBIL 6 FOTO, PILIH 3'}
            </div>
            <div className="text-xs text-retro-gray">
              FOTO: {capturedPhotos.length} / {requiredPhotos}
            </div>

            {/* Efek Toggle */}
            <div className="mt-3">
              <button
                onClick={cycleEffect}
                className="btn-retro text-xs px-4 py-2"
              >
                EFEK: {previewEffect.toUpperCase()}
              </button>
            </div>
          </div>

          {/* Camera Component */}
          <div className="mb-4">
            <Camera onCapture={handleCapture} previewEffect={previewEffect} />
          </div>

          {/* Galeri Thumbnail */}
          <div className="box-retro p-4 mb-4">
            <div className="text-pixel-alt text-sm mb-3">GALERI</div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {[...Array(requiredPhotos)].map((_, index) => (
                <div
                  key={index}
                  className="aspect-square border-retro border-retro-dark bg-retro-light relative overflow-hidden"
                >
                  {capturedPhotos[index] ? (
                    <Image
                      src={capturedPhotos[index]}
                      alt={`Foto ${index + 1}`}
                      fill
                      className="object-cover"
                      style={{ imageRendering: 'pixelated' }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-retro-gray text-xs">
                      {index + 1}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 justify-between">
            <button
              onClick={() => router.back()}
              className="btn-retro px-6 py-3"
            >
              &lt; KEMBALI
            </button>
            
            {isComplete ? (
              <button
                onClick={handleContinue}
                className="btn-retro px-8 py-3 bg-retro-dark text-retro-bg hover:bg-retro-gray animate-pulse"
              >
                LANJUT &gt;
              </button>
            ) : (
              <button
                disabled
                className="btn-retro px-8 py-3"
              >
                AMBIL FOTO DULU
              </button>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

// KUSTOMISASI:
// 1. requiredPhotos - ubah jumlah foto
// 2. Tambah sound effect saat capture
// 3. Grid galeri - ubah jumlah kolom
// 4. Preview effect - tambah efek baru di store
// 5. Timer countdown sebelum capture (opsional)