/** @type {import('eslint/lib/shared/types').ConfigData} */
const config = {
  overrides: [
    {
      files: '*.{,c,m}{j,t}s{,x}',
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
