module.exports = {
  parser: 'babel-eslint',
  plugins: ['react', 'react-native'],
  env: {
    'react-native/react-native': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
  ],
  rules: {
    quotes: ['error', 'single'],
    'no-console': 'off',
    'no-undef': 'error',
    'no-duplicate-imports': 'error',
  },
};
