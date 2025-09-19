import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/create-checkout-session': {
        target: 'http://localhost:4242',
        changeOrigin: true,
      },
      // Add other API endpoints as needed
    }
  }
})