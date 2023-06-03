import { defineConfig } from "vite";
import { getLocalIP } from './utils'

const host = getLocalIP()

let port = 8090

export default defineConfig({
    server: {
        host,
        port,
        proxy: {
            '/api': {
                target: 'https://api.weizhipin.com',
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/api/, '')
            },
        },
    },
});