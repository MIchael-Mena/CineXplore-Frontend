import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import svgr from 'vite-plugin-svgr'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite({}),react(), svgr()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@environment': path.resolve(__dirname, 'src/environment'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@schemas': path.resolve(__dirname, 'src/schemas'),
      '@screens': path.resolve(__dirname, 'src/screens'),
      '@theme': path.resolve(__dirname, 'src/theme'),
      '@auth': path.resolve(__dirname, 'src/auth'),
      '@layout': path.resolve(__dirname, 'src/layout'),
    },
  },
})
