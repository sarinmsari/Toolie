import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json'

export default defineConfig({
  server: {
    port: 5173,
    strictPort: false,
    hmr: {
      port: 5173,
    },
    cors: true,
  },
  base: './',
  plugins: [
    vue(),
    crx({ manifest }),
  ],
})