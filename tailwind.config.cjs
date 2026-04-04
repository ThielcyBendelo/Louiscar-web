module.exports = {
   darkMode: ['selector', '[data-theme="dark"]'], 
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-100': 'var(--color-dark-100)',
        'dark-200': 'var(--color-dark-200)',
        'dark-300': 'var(--color-dark-300)',
        'dark-400': 'var(--color-dark-400)',
      },
      fontFamily: {
        sans: ['Saira', 'sans-serif'],
        antonio: ['Antonio', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
