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
        'primary-color-700': '#13136C',
        'primary-color-900': '#181A21',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
    borderRadius: {
      inner: '0.5rem',
      outer: '1rem',
    },
    screens: {
      sm: '40rem',
      md: '48rem',
      lg: '64rem',
      xl: '80rem',
      '2xl': '96rem',
    },
    spacing: {},
  },
  plugins: [],
};
