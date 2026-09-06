import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import compression from 'vite-plugin-compression'

export default defineConfig(({ isSsrBuild }) => ({
  base: '/',
  server: { port: 8080 },
  plugins: [
    react(),
    tailwindcss(),
    ...(isSsrBuild
      ? []
      : [
          compression(),
          compression({
            algorithm: 'brotliCompress',
            ext: '.br',
          }),
        ]),
  ],
}))
