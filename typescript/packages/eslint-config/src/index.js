const unusedImportRules = {
  '@typescript-eslint/no-unused-vars': 'off',
  'unused-imports/no-unused-imports': 'error',
  'unused-imports/no-unused-vars': [
    'warn',
    { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
  ],
}

/** @type {import('eslint/lib/shared/types').ConfigData} */
const config = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended'],
  overrides: [
    {
      files: '*.{,c,m}{j,t}s{,x}',
      extends: ['plugin:import/recommended'],
      plugins: ['@typescript-eslint', 'unused-imports'],
      rules: {
        'import/order': [
          'error',
          {
            'newlines-between': 'always',
            groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
          },
        ],
        ...unusedImportRules,
      },
    },
  ],
}

module.exports = config
