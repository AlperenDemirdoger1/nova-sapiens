/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        night: '#030712',
        'iris-glow': '#7c8cff',
        'aqua-glow': '#5ce1e6',
      },
      boxShadow: {
        glow: '0 10px 50px rgba(92, 225, 230, 0.18)',
      },
    },
  },
  plugins: [],
}

