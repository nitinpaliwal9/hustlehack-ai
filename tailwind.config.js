/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7F5AF0',
          50: '#F3F0FF',
          100: '#E7DEFF',
          200: '#CFBBFF',
          300: '#B798FF',
          400: '#9F75FF',
          500: '#7F5AF0',
          600: '#6B46C1',
          700: '#553C9A',
          800: '#3F2D72',
          900: '#2A1E4A',
        },
        accent: {
          DEFAULT: '#00FFC2',
          50: '#E5FFF7',
          100: '#CCFFEF',
          200: '#99FFDF',
          300: '#66FFCF',
          400: '#33FFBF',
          500: '#00FFC2',
          600: '#00CC9B',
          700: '#009974',
          800: '#00664D',
          900: '#003326',
        },
        warning: '#FFE27A',
      },
      fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'shimmer': 'shimmer 2s infinite',
        'bounce-in': 'bounceIn 0.8s ease-out',
        'gradient-shift': 'gradientShift 8s ease infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      boxShadow: {
        'glow': '0 0 20px rgba(127, 90, 240, 0.3)',
        'glow-lg': '0 0 30px rgba(127, 90, 240, 0.4)',
      },
    },
  },
  plugins: [],
}
