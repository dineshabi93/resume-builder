// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // ✅ Important for Vercel deployment
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
