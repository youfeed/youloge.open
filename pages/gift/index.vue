<template>
  <div>
    <h1>Youloge.Gift 礼物卡 </h1>
    <p>现在您可以通过数字礼物卡向好友或家人的E-Mail直接送礼。送出礼物卡或了解更多礼物卡信息。</p>
    <div>选择金额 - 选择邮箱 - 完成购买</div>
    <div>
      <div style=" box-shadow: 0 1px 2px 1px #d4d7d7; position: relative; background: #00000005;aspect-ratio: 16 / 9;">
        <!-- <img src="/vite.svg" alt=""> -->
        <p>CN</p>
        <p>￥30</p>
        <div>An elephant at sunset</div>
      </div>
    </div>
    <a href="https://vitejs.dev" target="_blank">
      <!-- <img src="/vite.svg" class="logo" alt="Vite logo" /> -->
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <!-- <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" /> -->
    </a>
  </div>

  <HelloWorld msg="Vite + Vue" />
  <p>礼品卡会以数字ID形式发送到您好友邮箱，自购买之日起三年有效。</p>
  <small>© MICATEAM. 皖ICP备 19004549号 皖公安备案：34112402000344</small>
</template>
<script setup>
import HelloWorld from '@/components/HelloWorld.vue'
let lang = (navigator.language || navigator.browserLanguage).toLowerCase()
console.log(lang)
</script>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
