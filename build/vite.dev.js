import { defineConfig } from "vite";
import { getLocalIP } from './utils'

const useLocalHost = false
const useLocalProxy = false
const useProxyRewrite = false

const host = useLocalHost ? '127.0.0.1' : getLocalIP()
const proxyTarget = useLocalProxy ? 'http://172.16.26.234:3000' : 'https://api.weizhipin.com'

let port = 8090

const config = {
    server: {
        host,
        port,
        proxy: {
            '/api': {
                target: proxyTarget,
                changeOrigin: true,
            },
        },
    },
}

useProxyRewrite && (config.server.proxy['/api'].rewrite = (path) => path.replace(/^\/api/, ''))

export default defineConfig(config);