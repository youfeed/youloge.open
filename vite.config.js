import path from 'path'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {pages,renameHTML} from './vite.build.js'
import { viteExternalsPlugin } from 'vite-plugin-externals'
let mode = 'MPA'; // SPA MPA
const cdn = ()=>{
  return viteExternalsPlugin({
    vue: 'Vue',
  })
}
export default defineConfig({
  build:{
    polyfillModulePreload:false,
    sourcemap:false,
    rollupOptions:{
      // 单入口 适合一个人维护一个模块使用 好处：灵活
      'SPA':{
        external: ['vue','youloge'],
        input:'login.html',
        output: {
          entryFileNames:'assets/[name].js',
          format: 'umd',
          globals: {
            vue: 'Vue',
            'youloge':'youloge'
          },
        }
      },
      // 多入口
      'MPA':{
        external: ['vue','youloge'],
        input:pages(),
        output: {
          // entryFileNames:'assets/[name].js', // 要么刷新html 文件 要么 刷新js文件 CDN缓存你总要刷新一个
          globals: {
            vue: 'Vue',
            'youloge':'youloge'
          },
        }
      }
    }[mode]
  },
  css:{
    preprocessorOptions:{
      scss: {
        additionalData: `@import "/src/assets/scss/index.scss";`
      }
    }
  },
  resolve:{
    alias:{
      '@':path.resolve(__dirname,'src'),
      '#':path.resolve(__dirname,'lib'),
    }
  },
  external: ['vue'],
  paths:{
    'vue':'https://unpkg.com/vue@next'
  },
  plugins: [vue(),cdn(),UnoCSS(),renameHTML()],
})