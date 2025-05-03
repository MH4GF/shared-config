import { defineConfig } from 'vitest/config'

// biome-ignore lint/style/noDefaultExport: Vitest requires default export for config
export default defineConfig({
  test: {
    environment: 'node',
    include: ['**/*.test.ts', '**/*.test.tsx'],
    exclude: ['node_modules', 'dist'],
  },
})
