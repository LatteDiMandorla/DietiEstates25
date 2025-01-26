/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        'small-large': {
          raw: '(min-width: 1000px) and (min-height: 700px) and (min-aspect-ratio: 4/3)'
        }
      },

      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '50%': { transform: 'translateX(5px)' },
          '75%': { transform: 'translateX(-5px)' },
        },

        ring: {
          '0%': { transform: 'rotate(0)' },
          '1%': { transform: 'rotate(30deg)' },
          '3%': { transform: 'rotate(-28deg)' },
          '5%': { transform: 'rotate(34deg)' },
          '7%': { transform: 'rotate(-32deg)' },
          '9%': { transform: 'rotate(30deg)' },
          '11%': { transform: 'rotate(-28deg)' },
          '13%': { transform: 'rotate(26deg)' },
          '15%': { transform: 'rotate(-24deg)' },
          '17%': { transform: 'rotate(22deg)' },
          '19%': { transform: 'rotate(-20deg)' },
          '21%': { transform: 'rotate(18deg)' },
          '23%': { transform: 'rotate(-16deg)' },
          '25%': { transform: 'rotate(14deg)' },
          '27%': { transform: 'rotate(-12deg)' },
          '29%': { transform: 'rotate(10deg)' },
          '31%': { transform: 'rotate(-8deg)' },
          '33%': { transform: 'rotate(6deg)' },
          '35%': { transform: 'rotate(-4deg)' },
          '37%': { transform: 'rotate(2deg)' },
          '39%': { transform: 'rotate(-1deg)' },
          '41%': { transform: 'rotate(1deg)' },
          '43%, 100%': { transform: 'rotate(0)' },
        }
      },
      animation: {
        shake: 'shake 0.5s ease-in-out',
        ring:  'ring 3s 0.1s ease-in-out'
      },
    },
  },
  darkMode:'class',
  plugins: [],
}
