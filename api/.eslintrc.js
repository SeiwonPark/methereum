module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'no-unused-vars': 'off',
    'import/prefer-default-export': 0,
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never', ts: 'never', json: 'never',
    }],
    'import/no-unresolved': 0,
    quotes: ['error', 'single'],
    'valid-jsdoc': 0,
    'object-curly-spacing': ['error', 'always'],
    indent: ['error', 2],
    semi: ['error', 'always'],
    'linebreak-style': ['error', 'unix'],
    'comma-spacing': ['error', { before: false, after: true }],
    'no-multiple-empty-lines': ['error', { max: 2, maxBOF: 1 }],
    'max-len': ['error', { code: 120 }],
  },
};
