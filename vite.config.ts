/// <reference types="node" />
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/** SPA fallback: serve index.html for client routes so direct URLs and refresh work. */
function spaFallback() {
  return {
    name: 'spa-fallback',
    apply: 'serve',
    enforce: 'pre',
    configureServer(server: { middlewares: { use: (fn: (req: any, res: any, next: () => void) => void) => void } }) {
      server.middlewares.use((req, _res, next) => {
        const url = req.url ?? ''
        // Skip Vite internals, static assets, and requests with file extensions
        if (url.startsWith('/@') || url.startsWith('/node_modules') || url.includes('.')) {
          return next()
        }
        if (req.method === 'GET' && url !== '/' && !url.startsWith('/?')) {
          req.url = '/'
        }
        next()
      })
    },
    configurePreviewServer(server: { middlewares: { use: (fn: (req: any, res: any, next: () => void) => void) => void } }) {
      server.middlewares.use((req, _res, next) => {
        const url = req.url ?? ''
        if (url.startsWith('/@') || url.includes('.')) return next()
        if (req.method === 'GET' && url !== '/' && url !== '/index.html') {
          req.url = '/index.html'
        }
        next()
      })
    },
  }
}

export default defineConfig({
  appType: 'spa',
  base: process.env.BASE_PATH || '/',
  plugins: [spaFallback(), react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  server: {
    host: process.env.VITE_HOST || '0.0.0.0',
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5173,
    strictPort: false,
  },
})
