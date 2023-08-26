import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 多入口
export default defineConfig({
  base:'/youloge.open/',
  build:{
    rollupOptions:{
      input:{
        'index':'./index.html',
        '6/sso233':'sso.html',
      },
      output: {
        banner: '/* my-library version 0.0.1 */',
        footer: '/* follow me on Twitter! @rich_harris */',
      }
    },
  },
  plugins: [vue()],
})
