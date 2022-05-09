module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:jest/recommended',
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'no-unused-vars': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/prefer-default-export': 0,
    'react/require-default-props': 0,
    'react/no-unused-prop-types': 0,
    'react/jsx-filename-extension': [0],
    'no-param-reassign': 0,
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never', jsx: 'never', ts: 'never', tsx: 'never', json: 'never',
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
