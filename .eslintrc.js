module.exports = {
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  env: {
    es6: true,
  },
  extends: ['@handsin/eslint-config/javascript'],
  settings: {
    'import/resolver': {
      typescript: {
        project: ['frontend/tsconfig.json', 'backend/tsconfig.json'],
      },
    },
  },
  plugins: ['i18next'],
  extends: ['plugin:i18next/recommended'],
  rules: {
    'i18next/no-literal-string': [
      'error',
      {
        mode: 'jsx-only',
        'jsx-attributes': {
          include: [
            'label',
            'value',
            'placeholder',
            'title',
            'text',
            'message',
          ],
        },
      },
    ],
  },
  overrides: [
    {
      files: ['*.ts'],
      extends: ['@handsin/eslint-config/typescript'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    {
      files: ['*.tsx'],
      extends: ['@handsin/eslint-config/react/typescript'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        'react/jsx-no-useless-fragment': ['error', {allowExpressions: true}],
        'react/react-in-jsx-scope': 'off',
        'import/no-unused-modules': 'off',
      },
    },
  ],
};
