import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5000,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '.replit.dev',
      '.repl.co'
    ],
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    hmr: {
      clientPort: 443
    }
  },
  preview: {
    host: true,
    port: 5000,
    strictPort: true,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '.replit.dev',
      '.repl.co'
    ],
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  }
})