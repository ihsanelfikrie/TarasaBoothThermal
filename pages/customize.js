import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import useTarasaStore from '@/store/useTarasaStore'

export default function CustomizePage() {
  const router = useRouter()
  
  // Get state dari Zustand
  const template = useTarasaStore((state) => state.template)
  const header = useTarasaStore((state) => state.header)
  const footer = useTarasaStore((state) => state.footer)
  const setHeader = useTarasaStore((state) => state.setHeader)
  const setFooter = useTarasaStore((state) => state.setFooter)

  // Redirect jika belum pilih template
  useEffect(() => {
    if (!template) {
      router.push('/template')
    }
  }, [template, router])

  // Opsi Header & Footer
  const headerOptions = [
    { id: 'polos', label: 'POLOS', file: 'polos.png' },
    { id: 'logo-event', label: 'LOGO EVENT', file: 'logo-event.png' },
    { id: 'klasik', label: 'KLASIK', file: 'klasik.png' },
  ]

  const footerOptions = [
    { id: 'polos', label: 'POLOS', file: 'polos.png' },
    { id: 'terima-kasih', label: 'TERIMA KASIH', file: 'terima-kasih.png' },
    { id: 'tanggal', label: 'TANGGAL', file: 'tanggal.png' },
  ]

  const handleContinue = () => {
    router.push('/capture')
  }

  if (!template) {
    return null // Atau loading spinner
  }

  return (
    <>
      <Head>
        <title>TarasaBooth - Pilih Bingkai</title>
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-center bg-retro-bg p-4 md:p-8">
        <div className="box-retro max-w-4xl w-full p-6 md:p-12 fade-in">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-pixel text-xl md:text-2xl mb-4 tracking-wide">
              PILIH BINGKAI
            </h1>
            <div className="text-sm text-retro-gray">
              Template: {template === 'single' ? 'SINGLE FOTO' : 'STRIP PHOTO'}
            </div>
          </div>

          {/* Preview Area */}
          <div className="mb-8">
            <h2 className="text-pixel-alt text-base md:text-lg mb-4 text-center">
              PREVIEW
            </h2>
            <div className="box-retro p-4 bg-white max-w-md mx-auto">
              {/* Header Preview */}
              <div className="border-2 border-retro-dark mb-2 h-16 flex items-center justify-center bg-retro-bg">
                <span className="text-xs text-retro-gray">HEADER: {header.toUpperCase()}</span>
              </div>

              {/* Photo Boxes Preview */}
              {template === 'single' ? (
                <div className="border-2 border-retro-dark h-48 flex items-center justify-center bg-retro-light">
                  <span className="text-xs text-retro-gray">FOTO</span>
                </div>
              ) : (
                <div className="space-y-2">
                  {[1, 2, 3].map((num) => (
                    <div
                      key={num}
                      className="border-2 border-retro-dark h-32 flex items-center justify-center bg-retro-light"
                    >
                      <span className="text-xs text-retro-gray">FOTO {num}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Footer Preview */}
              <div className="border-2 border-retro-dark mt-2 h-16 flex items-center justify-center bg-retro-bg">
                <span className="text-xs text-retro-gray">FOOTER: {footer.toUpperCase()}</span>
              </div>
            </div>
          </div>

          {/* Header Selection */}
          <div className="mb-8">
            <h2 className="text-pixel-alt text-base md:text-lg mb-4">
              PILIH HEADER
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {headerOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setHeader(option.id)}
                  className={`btn-retro p-4 text-xs md:text-sm ${
                    header === option.id ? 'active' : ''
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Footer Selection */}
          <div className="mb-8">
            <h2 className="text-pixel-alt text-base md:text-lg mb-4">
              PILIH FOOTER
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {footerOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setFooter(option.id)}
                  className={`btn-retro p-4 text-xs md:text-sm ${
                    footer === option.id ? 'active' : ''
                  }`}
                >
                  {option.label}
                </button>
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
            <button
              onClick={handleContinue}
              className="btn-retro px-8 py-3 bg-retro-dark text-retro-bg hover:bg-retro-gray"
            >
              LANJUT &gt;
            </button>
          </div>
        </div>
      </main>
    </>
  )
}

// KUSTOMISASI YANG BISA ANDA UBAH:
// 1. headerOptions & footerOptions - tambah/ubah opsi
// 2. Preview layout - sesuaikan tampilan preview
// 3. Label tombol - ganti teks
// 4. Grid columns - ubah dari 3 kolom ke layout lain
// 5. Warna tombol LANJUT - sesuaikan styling