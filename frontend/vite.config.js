import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  css: {
    // Ye do lines lightningcss ki error ko khatam kar dengi
    transformer: 'postcss',
    minify: 'esbuild',
  },
  build: {
    cssMinify: 'esbuild', // LightningCSS ki jagah esbuild use hoga jo safe hai
  }
})