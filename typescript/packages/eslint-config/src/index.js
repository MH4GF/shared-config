import js from '@eslint/js'
import vitestPlugin from '@vitest/eslint-plugin'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'
import tseslint from 'typescript-eslint'

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
          '@typescript-eslint/naming-convention': 'off',
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
    vitest: [
      {
        files: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}', '**/__tests__/**/*'],
        plugins: {
          vitest: vitestPlugin,
        },
        rules: {
          ...vitestPlugin.configs.recommended.rules,
          'vitest/no-restricted-vi-methods': [
            'error',
            {
              mock: "Don't use vi.mock",
              mocked: "Don't use vi.mocked",
              spyOn: "Don't use vi.spyOn",
            },
          ],
        },
        languageOptions: {
          globals: {
            ...vitestPlugin.environments.env.globals,
          },
        },
        settings: {
          vitest: {
            typecheck: true,
          },
        },
      },
    ],
  },
  rules: {},
  processors: {},
}

// biome-ignore lint/style/noDefaultExport: ESLint requires default export for config
export default plugin
