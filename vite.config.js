import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [vue(), tailwindcss()],
    server: {
      open: true,
      proxy: {
        '/api': {
          target: env.VITE_BE_URL || 'http://172.25.86.226:8080',
          changeOrigin: true,
        },
      },
    },
  }
})
