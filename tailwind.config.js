const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xxs': '360px',
      'xs': '475px',
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        'sans': ['Poppins','Arial', 'Helvetica', 'sans-serif', ...defaultTheme.fontFamily.sans],
        'sterio': ['Afternoon in Stereo']
      },
      backgroundImage: {
        welcome: "url('/img/welcome.png')",
        welcome_mobile: "url('/img/comming_soon.png')",
        welcome_tab: "url('/img/welcome_bg_tab.png')",
      },
      transitionProperty: {
        'height': 'height'
      }
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#6F3E8D",
          "secondary": "#EEA86D",
          "accent": "#E0914F",
          "accent-focus": "#E7D895",
          "neutral": "#E7D895",
          "neutral-focus": "#D69C6B",
          "accent-focus": "#CFC287",
          "neutral3": "#C6EBE3",
          "base-100": "#ffffff",
        },
      },
    ]
  },
  plugins: [require('daisyui')],
}
