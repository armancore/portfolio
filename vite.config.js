import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import compression from 'vite-plugin-compression'

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    compression(),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ],
})
