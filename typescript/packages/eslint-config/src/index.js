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
      plugins: ['@typescript-eslint'],
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
      },
    },
  ],
}

module.exports = config
