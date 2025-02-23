import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// biome-ignore lint/style/noDefaultExport: Vite requires default export for config
export default defineConfig({
  plugins: [react()],
})
