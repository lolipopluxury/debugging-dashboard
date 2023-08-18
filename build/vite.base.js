import path from 'node:path';

import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import ElementPlus from 'unplugin-element-plus/vite'
import ModernizrWebpackPlugin from 'modernizr-webpack-plugin'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        ElementPlus({
            useSource: true,
        }),
        ModernizrWebpackPlugin()
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('../src', import.meta.url)),
        }
    },
    envDir: path.resolve(__dirname, '../env'),
    envPrefix: 'ENV_',
})