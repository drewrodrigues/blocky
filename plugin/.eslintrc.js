module.exports = {
  env: {
    browser: true,
    es2021: true,
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
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'max-lines': ['warn', 150],
    'max-lines-per-function': ['warn', { max: 25, skipComments: true }],
    '@typescript-eslint/no-namespace': ['off'],
    'no-inner-declarations': 'off',
  },
  overrides: [
    {
      files: 'src/**/*.tsx',
      rules: {
        'max-lines-per-function': ['off'],
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
}
