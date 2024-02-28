<template>
  <div class="y-ad" relative>
    <section>
      <figcaption>
        <img src="https://temp.im/800x200/4CD964/fff" alt="" max-w-full>
      </figcaption>
      <div class="spread" fixed top-1 right-1 bg-slate-50 p-1 rounded>
        <a :href="href" target="_blank" decoration-wavy text-gray-700 hover:text-gray-900>访问赞助商</a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, reactive,toRefs } from "vue";
let props = defineProps({
  aspect:String,
  cat:String,
  sub:String,
  spu:String,
  sku:String,
})
const state = reactive({
  name:'youloge.ad',
  version:'1.1.3',
  hash:location.hash,
  referrer:document.referrer,
  uage:navigator.language.toLowerCase(),
  ukey:'',
  href:'https://developer.qiniu.com/mkt/7261/cps-promotion-rules'
})
onMounted(() => {
  let {innerHeight,innerWidth} = window;
  let {clientWidth,clientHeight} = document.body;
  console.log(innerHeight,innerWidth,clientWidth,clientHeight)
  // 禁止本地
  sendMessage('ready',{msg:'youloge.ad is ready'});
  // window.self === window.top ? location.href ='/' : SendMessage('ready',{msg:'youloge.ad is ready'});
  const {referrer,hash,ukey} = state;
  window.onmessage = ({origin,data}) => {
    let {method,params} = data[hash] || {};
    console.log(origin)
    if(referrer.startsWith(origin) && method && ukey == ''){
      let work = {
        'init':()=>{
          params.ukey.length < 64 && sendMessage('error',{msg:'Ukey undefined'});
          state.host = new URL(origin).hostname;
          state.ukey = params.ukey;
          onInit();
        }
      };
      work[method] ? work[method]() : console.log('not method');
    }
  }
})
// 初始数据:提取广告单元
const onInit = ()=>{

}
const onjump = (url) => {
  window.open(`/ad?uuid=2333`,'_blank','spread');
}
// 回传消息
const sendMessage = (method,params) => {
  let {hash,referrer} = state;window.opener?.postMessage({ [hash]:{method:method,params:params} }, referrer);
}
const {href} = toRefs(state)
</script>

<style lang="scss">
*{margin: 0;padding: 0;}
</style>