const unusedImportRules = {
  '@typescript-eslint/no-unused-vars': 'off',
  'unused-imports/no-unused-imports': 'error',
  'unused-imports/no-unused-vars': [
    'warn',
    { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
  ],
}

const namingRules = {
  '@typescript-eslint/naming-convention': [
    'error',
    // 変数名は camelCase, PascalCase, UPPER_CASE
    {
      selector: 'default',
      format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
      leadingUnderscore: 'allowSingleOrDouble',
    },
    // 引数は基本的に camelCase、ライブラリの仕様で PascalCase になる場合もあるので PascalCase も許可。
    // _ で始まる引数は未使用引数として利用するので leadingUnderscore を許可。
    {
      selector: 'parameter',
      format: ['camelCase', 'PascalCase'],
      leadingUnderscore: 'allow',
    },
    // 型名は PascalCase
    {
      selector: 'typeLike',
      format: ['PascalCase'],
    },
    // オブジェクトのキーは API リクエストの body などで _ や - が利用されることがあるので全て許可
    {
      selector: ['classProperty', 'objectLiteralProperty', 'typeProperty', 'objectLiteralMethod'],
      format: null,
    },
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
    {
      files: '*.ts{,x}',
      plugins: ['unused-imports'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:@typescript-eslint/strict',
      ],
      rules: {
        ...unusedImportRules,
        ...namingRules,
        '@typescript-eslint/consistent-type-imports': ['error'],
      },
    },
  ],
}

module.exports = config
