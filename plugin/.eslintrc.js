module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier', 'jest'],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    semi: ['error', 'never'],
    'max-lines': ['warn', 150],
    'max-lines-per-function': ['warn', { max: 40, skipComments: true }],
    '@typescript-eslint/no-namespace': ['off'],
    'no-inner-declarations': 'off',
    'no-undef': 'error',
    '@typescript-eslint/ban-ts-comment': ['off'],
  },
  globals: {
    process: true,
    chrome: true,
    google: true,
    // ! hmm
    NodeListOf: true,
    JSX: true,
    NodeJS: true,
  },
  overrides: [
    {
      files: 'src/**/*.tsx',
      rules: {
        // functional components... Wish there was a
        // rule where would scope to UI components and other components
        // (could probably create something to do this based on function return typing)
        'max-lines-per-function': ['off'],
        'react/no-unescaped-entities': ['off'],
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
}
