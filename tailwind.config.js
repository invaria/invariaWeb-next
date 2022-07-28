/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    "./src/**/*.{js,jsx,ts,tsx}",

  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      colors: {
        'invar-dark': '#18141B',
        'invar-main-purple': '#44334C',
        'invar-light-grey': '#B4B7C0',
        'invar-purple': '#752EE5',
        'invar-grey': '#8F97A3',
        'invar-light-purple': '#E3D5FA',
        'invar-disabled': '#8F97A3',
        'invar-validation': '#FFC25F',
        'invar-error': '#F04679',
        'invar-success': '#00DEAE',
      },
      spacing: {
        '960': '240rem',
      },
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0px)'
          },
        },
        'fade-in-left': {
          '0%': {
            opacity: '0',
            transform: 'translateX(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0px)'
          },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 1s ease-out',
        'fade-in-up': 'fade-in-up 1s ease-out',
        'fade-in-left': 'fade-in-left 1s ease-out',
      }
    },
  },
  plugins:
    [
      require("daisyui"),
      require('tailwind-scrollbar-hide'),
    ],
  daisyui: {
    base: false,
    themes: [
      {
        mytheme: {
          "primary": "#44334C",
          "secondary": "#E3D5FA",
          "accent": "#B4B7C0",
          "neutral": "#808694",
          "base-100": "#EAE5EB",
          "info": "#2F125C",
          "success": "#15935A",
          "warning": "#F0AB0A",
          "error": "#fdd7e4",
        },
      }
    ]
  }
}
