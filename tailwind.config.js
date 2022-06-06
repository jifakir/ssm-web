const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '475px',
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        'sans': ['Poppins','Arial', 'Helvetica', 'sans-serif', ...defaultTheme.fontFamily.sans],
        'sterio': ['Afternoon in Stereo']
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#6F3E8D",
          "secondary": "#E0914F",
          "accent": "#EEA86D",
          "accent-focus": "#E7D895",
          "neutral": "#E7D895",
          "neutral-focus": "#CFC287",
          "neutral3": "#C6EBE3",
          "base-100": "#ffffff",
        },
      },
    ]
  },
  plugins: [require('daisyui')],
}
