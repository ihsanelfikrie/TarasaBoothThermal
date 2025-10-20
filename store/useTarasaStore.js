import { create } from 'zustand'

const useTarasaStore = create((set) => ({
  // ============================================
  // STATE: Pilihan Template
  // ============================================
  template: null, // 'single' atau 'strip'
  setTemplate: (template) => set({ template }),

  // ============================================
  // STATE: Pilihan Header & Footer
  // ============================================
  header: 'polos', // Default header
  footer: 'polos', // Default footer
  setHeader: (header) => set({ header }),
  setFooter: (footer) => set({ footer }),

  // ============================================
  // STATE: Foto yang Diambil
  // ============================================
  capturedPhotos: [], // Array berisi base64 image
  addPhoto: (photoBase64) =>
    set((state) => ({
      capturedPhotos: [...state.capturedPhotos, photoBase64],
    })),
  clearPhotos: () => set({ capturedPhotos: [] }),

  // ============================================
  // STATE: Foto yang Dipilih User
  // ============================================
  selectedPhotos: [], // Array berisi index foto yang dipilih
  toggleSelectedPhoto: (index) =>
    set((state) => {
      const isSelected = state.selectedPhotos.includes(index)
      if (isSelected) {
        // Jika sudah dipilih, hapus dari array
        return {
          selectedPhotos: state.selectedPhotos.filter((i) => i !== index),
        }
      } else {
        // Jika belum dipilih, tambahkan ke array
        // Batasi jumlah sesuai template
        const maxSelection = state.template === 'single' ? 1 : 3
        if (state.selectedPhotos.length >= maxSelection) {
          // Jika sudah maksimal, ganti foto terakhir
          const newSelection = [...state.selectedPhotos]
          newSelection[newSelection.length - 1] = index
          return { selectedPhotos: newSelection }
        }
        return {
          selectedPhotos: [...state.selectedPhotos, index],
        }
      }
    }),
  clearSelectedPhotos: () => set({ selectedPhotos: [] }),

  // ============================================
  // STATE: Efek Preview (untuk /capture page)
  // ============================================
  previewEffect: 'normal', // 'normal', 'pixelate', 'mosaic'
  cycleEffect: () =>
    set((state) => {
      const effects = ['normal', 'pixelate', 'mosaic']
      const currentIndex = effects.indexOf(state.previewEffect)
      const nextIndex = (currentIndex + 1) % effects.length
      return { previewEffect: effects[nextIndex] }
    }),

  // ============================================
  // STATE: URL QR Code & Download (hasil cetak)
  // ============================================
  qrUrl: null,
  downloadUrl: null,
  setQrUrl: (qrUrl) => set({ qrUrl }),
  setDownloadUrl: (downloadUrl) => set({ downloadUrl }),

  // ============================================
  // FUNCTION: Reset Semua State (untuk "Foto Lagi")
  // ============================================
  resetAll: () =>
    set({
      template: null,
      header: 'polos',
      footer: 'polos',
      capturedPhotos: [],
      selectedPhotos: [],
      previewEffect: 'normal',
      qrUrl: null,
      downloadUrl: null,
    }),
}))

export default useTarasaStore