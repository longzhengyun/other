import { defineConfig } from 'vite';
import vuePlugin from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vuePlugin()],
    optimizeDeps: {
        include: ['swiper/vue', 'axios']
    },
})