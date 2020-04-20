// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      colors: {
        black: {
          default: '#23272a'
        },
        gray: {
          ...defaultTheme.colors.gray,
          default: '#dcddde',
          light: '#40444b',
          lighter: '#36393f',
          darker: '#2f3136'
        },
        indigo: {
          ...defaultTheme.colors.indigo,
          default: '#7289da'
        }
      },
      flex: {
        fixed: '0 0 20em'
      }
    }
  },
  variants: {},
  plugins: []
};