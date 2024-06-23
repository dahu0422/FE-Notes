import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    cors: true,
    proxy: {
      '/api': {
        // 匹配所有以 /api 开头的请求路径
        target: 'http://127.0.0.1:3000/', // 代理目标的基础路径
        changeOrigin: true, // 支持跨域'
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./docs', import.meta.url))
    }
  }
})
