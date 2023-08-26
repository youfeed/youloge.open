import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 多入口
export default defineConfig({
  base:'/youloge.open/',
  build:{
    rollupOptions:{
      input:{
        'index':'index.html',
        'sso':'sso.html',
      },
      output: {}
    },
  },
  plugins: [vue()],
})