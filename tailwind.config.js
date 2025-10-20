/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Tema Retro Game Boy
        'retro-bg': '#F0E8D0',      // Background krem/gading
        'retro-dark': '#000000',    // Hitam untuk teks & border
        'retro-gray': '#888888',    // Abu-abu untuk disabled
        'retro-light': '#AAAAAA',   // Abu-abu terang untuk hover
        'retro-hover': '#CCCCCC',   // Hover state
      },
      fontFamily: {
        // Font pixel (dari Google Fonts)
        'pixel': ['"Press Start 2P"', 'cursive'],
        'pixel-alt': ['Silkscreen', 'monospace'],
      },
      spacing: {
        'retro-sm': '8px',
        'retro-md': '16px',
        'retro-lg': '24px',
      },
      borderWidth: {
        'retro': '3px',
        'retro-thick': '4px',
      },
    },
  },
  plugins: [],
}