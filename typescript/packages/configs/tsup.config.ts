import { defineConfig } from 'tsup'

// biome-ignore lint/style/noDefaultExport: tsup requires default export for config
export default defineConfig({
  entry: ['src/cli.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  minify: false,
  target: 'node18',
  outDir: 'bin',
  shims: true,
  bundle: true,
  splitting: false,
  external: ['ink', 'commander', 'react', 'react-devtools-core'],
  sourcemap: true,
})
