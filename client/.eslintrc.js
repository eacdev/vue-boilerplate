module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  ignorePatterns: ['webpack.config.js', '*.css'],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/essential',
    'plugin:prettier/recommended'
  ]
};
