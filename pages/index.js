import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function SplashScreen() {
  const router = useRouter()

  useEffect(() => {
    // Redirect ke halaman /template setelah 3 detik
    const timer = setTimeout(() => {
      router.push('/template')
    }, 3000)

    // Cleanup timer jika component unmount
    return () => clearTimeout(timer)
  }, [router])

  return (
    <>
      <Head>
        <title>TarasaBooth - Loading...</title>
        <meta name="description" content="Retro photo booth experience" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-center bg-retro-bg p-8">
        {/* Border luar seperti Game Boy */}
        <div className="box-retro max-w-2xl w-full p-12 text-center fade-in">
          {/* Logo TarasaBooth */}
          <div className="mb-8">
            <h1 className="text-pixel text-4xl md:text-5xl mb-4 tracking-wider">
              TARASA
              <br />
              BOOTH
            </h1>
          </div>

          {/* Pixel Art Decoration (opsional) */}
          <div className="flex justify-center gap-4 mb-8">
            <div className="w-4 h-4 bg-retro-dark"></div>
            <div className="w-4 h-4 bg-retro-dark"></div>
            <div className="w-4 h-4 bg-retro-dark"></div>
          </div>

          {/* Loading Text dengan Blinking Cursor */}
          <div className="text-pixel-alt text-lg">
            LOADING<span className="blink">_</span>
          </div>

          {/* Progress Bar (opsional) */}
          <div className="mt-8 w-full">
            <div className="box-retro p-2">
              <div className="h-4 bg-retro-dark animate-pulse"></div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 text-xs text-retro-gray">
            © 2025 TARASABOOTH v1.0
          </div>
        </div>
      </main>
    </>
  )
}

// KUSTOMISASI YANG BISA ANDA UBAH:
// 1. Durasi splash (3000ms = 3 detik) - ubah di setTimeout
// 2. Teks "TARASA BOOTH" - ganti dengan nama lain
// 3. Ukuran font - ubah className text-4xl/text-5xl
// 4. Tambahkan gambar logo - tambahkan <img> tag
// 5. Animasi - tambahkan efek glitch atau animasi lain