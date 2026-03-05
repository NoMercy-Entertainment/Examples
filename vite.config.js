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
      // Resolve to TS source so Vite compiles it as ESM — the CJS dist has
      // __esModule without exports.default, which breaks Rollup's default import.
      // The stubCapacitorMediaSession plugin handles the native-only capacitor import.
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
