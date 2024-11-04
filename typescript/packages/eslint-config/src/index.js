import js from '@eslint/js'
import importPlugin from 'eslint-plugin-import'
import unusedImports from 'eslint-plugin-unused-imports'
import tseslint from 'typescript-eslint'
import globals from 'globals'

const plugin = {
  meta: {
    name: '@mh4gf/eslint-config',
  },
  configs: {
    recommended: [
      js.configs.recommended,
      {
        languageOptions: {
          globals: {
            ...globals.node,
          },
        },
      },
      {
        plugins: {
          'unused-imports': unusedImports,
        },
        rules: {
          'unused-imports/no-unused-imports': 'error',
          'unused-imports/no-unused-vars': [
            'warn',
            {
              vars: 'all',
              varsIgnorePattern: '^_',
              args: 'after-used',
              argsIgnorePattern: '^_',
            },
          ],
        },
      },
      {
        files: ['**/*.{,c,m}{j,t}s{,x}'],
        ...importPlugin.flatConfigs.recommended,
      },
    ],
    typescript: [
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.strict,
      {
        files: ['**/*.ts{,x}'],
        settings: {
          'import/resolver': {
            typescript: {},
          },
        },
        rules: {
          '@typescript-eslint/no-unused-vars': 'off',
          '@typescript-eslint/naming-convention': [
            'error',
            {
              selector: 'default',
              format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
              leadingUnderscore: 'allowSingleOrDouble',
            },
            {
              selector: 'parameter',
              format: ['camelCase', 'PascalCase'],
              leadingUnderscore: 'allow',
            },
            {
              selector: 'typeLike',
              format: ['PascalCase'],
            },
            {
              selector: [
                'classProperty',
                'objectLiteralProperty',
                'typeProperty',
                'objectLiteralMethod',
              ],

              format: null,
            },
          ],
          '@typescript-eslint/consistent-type-imports': ['error'],

          // tsのnoPropertyAccessFromIndexSignatureと競合するためオフにする
          // @see: https://typescript-eslint.io/rules/dot-notation/
          // @see: https://typescriptbook.jp/reference/tsconfig/nopropertyaccessfromindexsignature
          '@typescript-eslint/dot-notation': 'off',

          // biomeへ移行するためオフにする
          '@typescript-eslint/no-empty-interface': 'off',
        },
      },
    ],
  },
  rules: {},
  processors: {},
}

export default plugin
