import mh4gf from '@mh4gf/eslint-config'

// biome-ignore lint/style/noDefaultExport: ESLint requires default export for config
export default [
  ...mh4gf.configs.recommended,
  {
    rules: {
      'import/no-unresolved': 'off',
    },
  },
  {
    ignores: ['examples/**/*'],
  },
]
