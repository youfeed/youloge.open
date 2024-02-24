import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import vue from '@vitejs/plugin-vue'
let mode = 'SPA'; // SPA MPA
export default defineConfig({
  build:{
    polyfillModulePreload:false,
    sourcemap:false,
    rollupOptions:{
      // 单入口 适合一个人维护一个模块使用 好处：灵活
      'SPA':{
        external: ['vue','youloge'],
        input:'payment.html',
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
        input:{
          'ad':'ad.html',
          'sso':'sso.html',
          'pay':'pay.html',
          'link':'link.html',
          'index':'index.html',
          'login':'login.html',
          'video':'video.html',
          'captcha':'captcha.html',
          'payment':'payment.html',
          'shopcart':'shopcart.html',
        },
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
  plugins: [vue(),UnoCSS()],
  // server: {
  //   host: 'localhost.youloge.com',
  // }
})