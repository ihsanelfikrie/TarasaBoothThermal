import { useRef, useCallback, useState } from 'react'
import Webcam from 'react-webcam'

export default function Camera({ onCapture, previewEffect = 'normal' }) {
  const webcamRef = useRef(null)
  const [hasError, setHasError] = useState(false)

  // Fungsi untuk mengambil foto
  const capturePhoto = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot()
      if (imageSrc) {
        onCapture(imageSrc)
      }
    }
  }, [webcamRef, onCapture])

  // CSS Filter untuk preview efek
  const getFilterStyle = () => {
    switch (previewEffect) {
      case 'pixelate':
        return {
          filter: 'contrast(1.2) saturate(0)',
          imageRendering: 'pixelated',
        }
      case 'mosaic':
        return {
          filter: 'contrast(1.5) saturate(0) blur(1px)',
        }
      default:
        return {}
    }
  }

  return (
    <div className="relative w-full">
      {!hasError ? (
        <>
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              facingMode: 'user', // 'user' = kamera depan, 'environment' = kamera belakang
              width: 1280,
              height: 720,
            }}
            className="w-full h-auto box-retro"
            style={getFilterStyle()}
            onUserMediaError={() => setHasError(true)}
          />

          {/* Overlay Grid (opsional, untuk guide komposisi) */}
          <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 opacity-20">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="border border-retro-dark" />
            ))}
          </div>
        </>
      ) : (
        <div className="box-retro p-12 text-center bg-retro-light">
          <div className="text-pixel-alt text-sm mb-4">⚠️ KAMERA ERROR</div>
          <div className="text-xs text-retro-gray">
            Pastikan Anda sudah memberikan izin akses kamera.
            <br />
            Coba refresh halaman atau gunakan browser lain.
          </div>
        </div>
      )}

      {/* Tombol Capture */}
      <div className="mt-4 text-center">
        <button
          onClick={capturePhoto}
          disabled={hasError}
          className="btn-retro text-2xl md:text-3xl px-12 py-6 font-bold"
        >
          [ O ]
        </button>
        <div className="text-xs text-retro-gray mt-2">
          TEKAN UNTUK CEKREK
        </div>
      </div>
    </div>
  )
}

// KUSTOMISASI:
// 1. facingMode - ubah ke 'environment' untuk kamera belakang
// 2. videoConstraints - ubah resolusi
// 3. Tombol capture - ganti icon/text
// 4. Grid overlay - hapus atau ubah style