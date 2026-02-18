/// <reference types="node" />
import path from 'path'
import { copyFileSync } from 'fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/** GitHub Pages (and similar): copy index.html → 404.html so unknown paths load the SPA. */
function ghPages404() {
  let outDir: string
  return {
    name: 'gh-pages-404',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      copyFileSync(path.join(outDir, 'index.html'), path.join(outDir, '404.html'))
    },
  }
}

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
  plugins: [ghPages404(), spaFallback(), react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  server: {
    host: process.env.VITE_HOST || '0.0.0.0',
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5173,
    strictPort: false,
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['legacy-js-api', 'import'],
      },
    },
  },
})
