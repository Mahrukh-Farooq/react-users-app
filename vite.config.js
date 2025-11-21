import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests to your Node.js backend
      // Change '/api' to match your backend API path
      '/api': {
        target: 'http://localhost:3000', // Change to your backend URL
        changeOrigin: true,
      },
    },
  },
})
