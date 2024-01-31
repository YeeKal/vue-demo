/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  content: [],
  theme: {
    extend: {
      colors: {
        bgBase: 'var(--color-bgBase)',
        surface: 'var(--color-surface)',
        textOnBase: 'var(--color-textOnBase)',
        textOnSurface: 'var(--color-textOnSurface)',
      }
    },
  },
  plugins: [],
  safelist: [
    'bg-opacity-0',
    'bg-opacity-10',
    'bg-opacity-20',
    'bg-opacity-30',
    'bg-opacity-40',
    'bg-opacity-50',
    'bg-opacity-60',
    'bg-opacity-70',
    'bg-opacity-80',
    'bg-opacity-90',
    'bg-opacity-100',

    // i have to add this because tailwind is not smart enough to detect that bg-bgBase is used
    'bg-bgBase'  
  ]
}

