import { defineConfig, loadEnv, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';
import dotenv from 'dotenv';
import minimist from 'minimist';

const args = minimist(process.argv.slice(2));
const envFile = args.m === 'testing' ? '.env.testing' : args.m === 'production' ? '.env.production' : '.env.dev';
// 加载环境变量
const env = dotenv.config({ path: envFile });
console.log(444, env.parsed?.NODE_ENV)

const buildReportplugin  = ['production'].includes(args.m) ? visualizer({ brotliSize: true, gzipSize: true, filename: 'dist/report.html' }) : null;


// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  plugins: [vue(), buildReportplugin],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/style/variables.scss";',
      }
    }
  }
})
