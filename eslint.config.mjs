import mh4gf from '@mh4gf/eslint-config'

export default [
  ...mh4gf.configs.recommended,
  {
    rules: {
      'import/no-unresolved': 'off',
    },
  },
]
