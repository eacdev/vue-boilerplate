// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        title: ['Poppins'],
        body: ['Lato']
      },
      colors: {
        indigo: {
          default: '#7C6BF9',
          lighter: '#F0EDFE',
          dark: '#0D2665'
        },
        gray: {
          ...defaultTheme.colors.gray,
          default: '#F4F8FB',
          darker: '#E3EAF2',
          muted: '#AAAAAA'
        },
        blue: '#4298FE',
        red: {
          ...defaultTheme.colors.red,
          default: '#FE346E'
        }
      },
      borderWidth: {
        ...defaultTheme.borderWidth,
        '1': '1px'
      },
      flex: {
        fixed: '0 0 15em'
      }
    }
  },
  variants: {},
  plugins: []
};
