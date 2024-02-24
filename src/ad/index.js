import { createApp } from 'vue'
import App from './index.vue'
import 'virtual:uno.css'
/*
 * aspect 16/9 5/4 显示占比
 * 电商广告可以从一级大类精确到库存
 * cat[] 一个分类
 * sub[] 二级分类
 * spu[] 产品单元
 * spk[] 库存单元
 * 支持:v-ad="" 指令用户点击跳过/关闭/访问广告 执行命令
*/
createApp(App).mount('#app')