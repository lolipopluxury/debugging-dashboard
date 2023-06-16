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
                // target: 'https://api.weizhipin.com',
                target: 'http://172.16.26.234:3000',
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/api/, '')
            },
        },
    },
});