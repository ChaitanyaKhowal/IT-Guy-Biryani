/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#FAF6F1', // Warm ivory main background
        codeGray: '#FFFFFF', // Clean white card surface
        borderGray: '#E8DED4', // Very soft border color
        altBg: '#F3ECE3', // Section alternate warm cream background
        brownText: {
          heading: '#241B16', // Espresso brown for primary headings
          body: '#5B4A42', // Readable warm grey for body text
          muted: '#8C7A70' // Muted text color
        },
        orange: {
          DEFAULT: '#C96A1A', // Saffron brand color
          dark: '#A65313', // Hover brand color
          light: '#D98A2B' // Gradient start saffron
        },
        success: '#4F6B3C', // Premium green for fresh/organic indicators
        alert: '#6E2B25' // Deep maroon for limited slots/alert highlights
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      boxShadow: {
        card: '0 12px 40px rgba(0, 0, 0, 0.08)',
        nav: '0 8px 30px rgba(0, 0, 0, 0.05)',
        glow: '0 4px 12px rgba(201, 106, 26, 0.15)'
      },
      borderRadius: {
        'btn': '14px',
        'card': '20px'
      }
    }
  },
  plugins: []
}
