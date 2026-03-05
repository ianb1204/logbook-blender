import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/logbook-blender/',
  plugins: [react(), svgr()],
  build: {
    outDir: 'dist'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port:3000,
    hmr: {
      overlay: false
    },
    allowedHosts: ['ian-bertin.fr', 'www.ian-bertin.fr']
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/common.scss";`,
      },
    },
  },
})
