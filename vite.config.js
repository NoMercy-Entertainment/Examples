import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// Stub out @jofr/capacitor-media-session — only used on native, not web
function stubCapacitorMediaSession() {
  const id = '@jofr/capacitor-media-session';
  return {
    name: 'stub-capacitor-media-session',
    resolveId(source) { return source === id ? id : null; },
    load(resolvedId) { return resolvedId === id ? 'export const MediaSession = {}; export default {};' : null; },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    stubCapacitorMediaSession(),
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  }
})
