import { defineConfig } from 'vitest/config'

// biome-ignore lint/style/noDefaultExport: vitest requires default export
export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
  },
  esbuild: {
    jsx: 'automatic',
  },
})
