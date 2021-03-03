import { defineConfig } from 'vite';
import vuePlugin from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vuePlugin()],
    optimizeDeps: {
        include: ['axios']
    },
    server: {
        proxy: {
            '/api': {
                target: 'https://www.jary8.com/api',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
})