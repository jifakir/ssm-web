const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Arial', 'Helvetica', 'sans-serif', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#0068FF",
          "secondary": "#000076",
          "accent": "#F87272",
          "neutral": "#C4C4C4",
          "neutral1": "949494",
          "base-100": "#ffffff",
        },
      },
    ]
  },
  plugins: [require('daisyui')],
}
