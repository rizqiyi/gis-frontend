require('dotenv').config()

const { NODE_ENV } = process.env

const config = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/react',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*/**.ts'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: ['./tsconfig.eslint.json'],
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'no-console': NODE_ENV === 'development' ? 'off' : 'error',
    'import/newline-after-import': 'error',
    'react/require-default-props': 'off',
    quotes: ['error', 'single'],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    semi: 'off',
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
        imports: 'always-multiline',
        objects: 'always-multiline',
      },
    ],
    '@typescript-eslint/no-var-requires': ['off'],
    'import/order': 'error',
    'import/first': 'error',
    'import/no-unresolved': 'off',
  },
}

module.exports = config
