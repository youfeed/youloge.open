<template>
  <section>
    <figcaption>
      <img src="https://th.bing.com/th/id/OIP.ZjonDgr8gSdO3xlLbcDfMwHaDt?w=321&h=174&c=7&r=0&o=5&pid=1.7" alt="" >
      <div class="title">
        <div>这是一个广告服务 默认16：9</div>
        <button @click="onjump">立即购买</button>
      </div>
    </figcaption>
    <div class="spread">推广</div>
  </section>
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
  ukey:''
})
onMounted(() => {
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
const {} = toRefs(state)
</script>

<style lang="scss">
figcaption .title{
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
}
.spread{
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 12px;
  color: #b3b3b3;
  background: #9e9e9e61;
  padding: 2px 5px;
  cursor: pointer;
}
</style>