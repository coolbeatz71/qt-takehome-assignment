/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        success: {
          50: '#e6f9f9',
          100: '#ccf3f3',
          200: '#99e7e7',
          300: '#66dbdb',
          400: '#33cfcf',
          500: '#08bdbd',
          600: '#069797',
          700: '#057171',
          800: '#034c4c',
          900: '#022626',
        },
        danger: {
          50: '#fce6f3',
          100: '#f9cce7',
          200: '#f399cf',
          300: '#ed66b7',
          400: '#e7339f',
          500: '#dc0073',
          600: '#b0005c',
          700: '#840045',
          800: '#58002e',
          900: '#2c0017',
        },
      },
    },
  },
  plugins: [],
}
