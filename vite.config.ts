import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import compression from 'vite-plugin-compression'

// isSsrBuild is true for the `vite build --ssr` pass that feeds the prerender
// script. That output is a build-time artifact and gets deleted afterwards, so
// there is nothing to gain from precompressing it.
export default defineConfig(({ isSsrBuild }) => ({
  base: '/',
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
