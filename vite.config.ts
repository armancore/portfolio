import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import compression from 'vite-plugin-compression'

export default defineConfig(({ isSsrBuild }) => ({
  base: '/',
  server: { port: 8080 },
  // The client manifest lets the prerender step preload each route's lazy chunks.
  build: { manifest: !isSsrBuild },
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
