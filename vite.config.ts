import { defineConfig, loadEnv, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import minimist from 'minimist';

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const pathSrc = path.resolve(__dirname, "src");
const args = minimist(process.argv.slice(2));
const envFile = args.m === 'testing' ? '.env.testing' : args.m === 'production' ? '.env.production' : '.env.dev';
// 加载环境变量
const env = dotenv.config({ path: envFile });
console.log(444, env.parsed?.NODE_ENV)

const buildReportplugin  = ['production'].includes(args.m) ? visualizer({ brotliSize: true, gzipSize: true, filename: 'dist/report.html' }) : null;


// https://vitejs.dev/config/
export default defineConfig(() => {
  const optimizeDepsElementPlusIncludes = ["element-plus/es"]
  fs.readdirSync("node_modules/element-plus/es/components").map((dirname) => {
    fs.access(
      `node_modules/element-plus/es/components/${dirname}/style/css.mjs`,
      (err) => {
        if (!err) {
          optimizeDepsElementPlusIncludes.push(
            `element-plus/es/components/${dirname}/style/css`
          )
        }
      }
    )
  })
  return {
    optimizeDeps: {
      include: optimizeDepsElementPlusIncludes,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      }
    },
    plugins: [
      vue(),
      buildReportplugin,
      AutoImport({
        imports: [
          'vue',
          'vue-router'
        ],
        dts: path.resolve(pathSrc, 'types', 'auto-imports.d.ts'),
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        dts: path.resolve(pathSrc, "types", "components.d.ts"),
        resolvers: [ElementPlusResolver()],
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/style/variables.scss";',
        }
      }
    }
  }
})
