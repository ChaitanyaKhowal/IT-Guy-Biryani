/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#FFF9F2', // Background: #FFF9F2
        codeGray: '#F8F1E8', // Cards: #F8F1E8
        borderGray: '#E8DED4', // Soft warm border
        altBg: '#F8F1E8', // Alternating section surface
        brownText: {
          heading: '#2E2018', // Heading: #2E2018
          body: '#5B463A', // Body: #5B463A
          muted: '#8C7A70' // Muted warm grey
        },
        orange: {
          DEFAULT: '#A65A2E', // Primary: #A65A2E
          dark: '#8C4924', // Hover: #8C4924
          light: '#D99A2B' // Accent: #D99A2B
        },
        success: '#3E7C59', // Success: #3E7C59
        alert: '#6E2B25' // Alert deep red
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      boxShadow: {
        card: '0 12px 40px rgba(46, 32, 24, 0.06)',
        nav: '0 8px 30px rgba(46, 32, 24, 0.04)',
        glow: '0 4px 12px rgba(166, 90, 46, 0.15)'
      },
      borderRadius: {
        'btn': '14px',
        'card': '20px'
      }
    }
  },
  plugins: []
}
