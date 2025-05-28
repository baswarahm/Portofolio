/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}", "./public/src/js/**/*.js"],
  darkMode: 'class', // Aktifkan dark mode berdasarkan class
  theme: {
    extend: {
      fontFamily: {
        'quicksand': ['Quicksand', 'sans-serif'],
      },
      colors: {
        'primary-dark': '#0F172A', // Dark mode background (Slate 900)
        'secondary-dark': '#1E293B', // Darker elements in dark mode (Slate 800)
        'text-light': '#F8FAFC', // Text color in dark mode (Slate 50)
        'text-dark': '#334155', // Text color in light mode (Slate 700)
        'primary-light': '#F1F5F9', // Light mode background (Slate 100)
        'secondary-light': '#E2E8F0', // Lighter elements in light mode (Slate 200)
        'accent-blue': '#3B82F6', // Blue 500
        'accent-cyan': '#06B6D4', // Cyan 500
      },
      keyframes: {
        'infinite-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'typing': {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        'blink-caret': {
          'from, to': { 'border-color': 'transparent' },
          '50%': { 'border-color': 'currentColor' },
        },
        'marquee': {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(-100%)' },
        },
        'fade-in': {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
        }
      },
      animation: {
        'infinite-bounce': 'infinite-bounce 1s infinite',
        'typing': 'typing 4s steps(30, end), blink-caret .75s step-end infinite',
        'marquee': 'marquee 20s linear infinite',
        'fade-in': 'fade-in 0.5s ease-out forwards',
      }
    },
  },
  plugins: [],
}