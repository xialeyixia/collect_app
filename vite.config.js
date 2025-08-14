import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        port: 39997,
        host: "0.0.0.0",
        proxy: {
            // 选项写法
            '/api': {
                target: 'http://101.43.110.234:39000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '/api'),
            },
        },
    },
})
