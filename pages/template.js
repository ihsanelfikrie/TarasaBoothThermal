import { useRouter } from 'next/router'
import Head from 'next/head'
import useTarasaStore from '@/store/useTarasaStore'

export default function TemplatePage() {
  const router = useRouter()
  const setTemplate = useTarasaStore((state) => state.setTemplate)

  const handleSelectTemplate = (templateType) => {
    setTemplate(templateType)
    router.push('/customize')
  }

  return (
    <>
      <Head>
        <title>TarasaBooth - Pilih Template</title>
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-center bg-retro-bg p-4 md:p-8">
        <div className="box-retro max-w-4xl w-full p-8 md:p-12 fade-in">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-pixel text-2xl md:text-3xl mb-4 tracking-wide">
              PILIH GAYA FOTO
            </h1>
            <div className="flex justify-center gap-2 mt-4">
              <div className="w-2 h-2 bg-retro-dark"></div>
              <div className="w-2 h-2 bg-retro-dark"></div>
              <div className="w-2 h-2 bg-retro-dark"></div>
            </div>
          </div>

          {/* Template Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Single Photo Option */}
            <button
              onClick={() => handleSelectTemplate('single')}
              className="btn-retro p-8 md:p-12 group hover:scale-105 transition-transform"
            >
              <div className="flex flex-col items-center gap-6">
                {/* Icon - Single Box */}
                <div className="box-retro w-32 h-32 md:w-40 md:h-40 flex items-center justify-center bg-retro-bg group-hover:bg-retro-light transition-colors">
                  <div className="w-20 h-20 md:w-24 md:h-24 border-4 border-retro-dark"></div>
                </div>

                {/* Label */}
                <div className="text-pixel-alt text-base md:text-lg">
                  SINGLE FOTO
                </div>

                {/* Description */}
                <div className="text-xs md:text-sm text-retro-gray">
                  Ambil 3 foto, pilih 1
                </div>
              </div>
            </button>

            {/* Strip Photo Option */}
            <button
              onClick={() => handleSelectTemplate('strip')}
              className="btn-retro p-8 md:p-12 group hover:scale-105 transition-transform"
            >
              <div className="flex flex-col items-center gap-6">
                {/* Icon - Three Stacked Boxes */}
                <div className="box-retro w-32 h-32 md:w-40 md:h-40 flex flex-col items-center justify-center gap-2 bg-retro-bg group-hover:bg-retro-light transition-colors p-4">
                  <div className="w-20 h-6 border-4 border-retro-dark"></div>
                  <div className="w-20 h-6 border-4 border-retro-dark"></div>
                  <div className="w-20 h-6 border-4 border-retro-dark"></div>
                </div>

                {/* Label */}
                <div className="text-pixel-alt text-base md:text-lg">
                  STRIP PHOTO
                </div>

                {/* Description */}
                <div className="text-xs md:text-sm text-retro-gray">
                  Ambil 6 foto, pilih 3
                </div>
              </div>
            </button>
          </div>

          {/* Footer Info */}
          <div className="text-center mt-12 text-xs md:text-sm text-retro-gray">
            Pilih salah satu gaya untuk melanjutkan
          </div>
        </div>
      </main>
    </>
  )
}

// KUSTOMISASI YANG BISA ANDA UBAH:
// 1. Judul "PILIH GAYA FOTO" - ganti teks
// 2. Nama template "SINGLE FOTO" & "STRIP PHOTO" - ganti label
// 3. Deskripsi (3 foto/6 foto) - ubah jumlah sesuai keinginan
// 4. Icon/visual - ubah ukuran atau bentuk kotak
// 5. Tambahkan template ketiga (misalnya "COLLAGE" 4 foto)