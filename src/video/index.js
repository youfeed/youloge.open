import { createApp } from 'vue'
import App from './index.vue'
import 'virtual:uno.css'
/**
 * UUID MP4 Dash M3U8 LIVE
 * AD: > 60s 广告可选除去右下角其他三个角落(跳转按钮) 广告播放 > 
 * 5秒 任意位置直接关闭广告
 * 首屏不加载广告 广告点越往前 越容易影响用户 价格越高 最低为片尾 < 10秒
 */
createApp(App).mount('#app')
