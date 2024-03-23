/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        neutral: '#131313',
        'primary-text': '#ECECF8',
        'secondary-text': '#545454',
        'tertiary-text': '#272727',
        'primary-color-500': '#2626D9',
        'primary-color-700': '#181A21',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      fontWeight: {
        regular: '400',
        bold: '700',
      },
      borderRadius: {
        inner: '0.5rem',
        outer: '1rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
};
