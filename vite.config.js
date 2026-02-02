import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json'

export default defineConfig({
  base: './',
  plugins: [
    vue(),
    crx({ manifest }),
  ],
  build: {
    // This ensures your output is clean and compatible with Chrome's CSP
    minify: 'terser', 
    rollupOptions: {
      input: {
        main: 'index.html',
      },
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173,
    },
    cors: {
      origin: '*', // Allows any origin, including your extension
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept'], 
      preflightContinue: false,
      optionsSuccessStatus: 204
    },
  },
})