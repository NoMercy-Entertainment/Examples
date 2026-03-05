import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@nomercy-entertainment/media-session': fileURLToPath(
        new URL('./node_modules/@nomercy-entertainment/media-session/src/index.ts', import.meta.url)
      ),
    },
  },
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  }
})
