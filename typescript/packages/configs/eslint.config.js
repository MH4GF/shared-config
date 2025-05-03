import { fileURLToPath } from 'node:url'
import { includeIgnoreFile } from '@eslint/compat'
import mh4gf from '@mh4gf/eslint-config'

const gitignorePath = fileURLToPath(new URL('../../../.gitignore', import.meta.url))

// biome-ignore lint/style/noDefaultExport: ESLint requires default export for config
export default [
  { ignores: ['eslint.config.js'] },
  includeIgnoreFile(gitignorePath),
  ...mh4gf.configs.recommended,
  ...mh4gf.configs.typescript,
  ...mh4gf.configs.vitest,
  {
    rules: {
      'import/no-unresolved': 'off',
    },
  },
]
