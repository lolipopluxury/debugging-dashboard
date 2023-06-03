import { defineConfig } from 'vite';
import configBase from './build/vite.base';
import configDev from './build/vite.dev';
import configProd from './build/vite.prod';

const configs = {
  'serve': () => Object.assign(configBase, configDev),
  'build': () => Object.assign(configBase, configProd),
}

export default defineConfig(config => {
  const { command = 'build' || 'serve' } = config
  return configs[command]();
})