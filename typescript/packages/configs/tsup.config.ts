import { defineConfig } from 'tsup'

// biome-ignore lint/style/noDefaultExport: tsup requires default export
export default defineConfig({
  entry: ['src/**/*.ts', 'src/**/*.tsx'],
  outDir: 'bin',
  format: ['esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  shims: false,
  esbuild: {
    jsx: 'automatic',
  },
})
