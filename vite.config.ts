/// <reference types="node" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

const useHttps = process.env.HTTPS === '1' || process.env.HTTPS === 'true'

export default defineConfig({
  // GitHub Pages serves at https://<user>.github.io/<repo>/
  base: process.env.BASE_PATH || "/",
  plugins: [
    react(),
    ...(useHttps
      ? [
          basicSsl({
            domains: ['localhost', '127.0.0.1', '10.7.9.149', '100.96.0.2'],
          }),
        ]
      : []),
  ],
  server: {
    host: '0.0.0.0', // listen on all interfaces (localhost + network IPs like 100.96.0.2)
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5173,
    strictPort: false,
    ...(useHttps && { https: true }),
  } as import('vite').ServerOptions,
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        includePaths: ['node_modules'],
      },
    },
  },
})
