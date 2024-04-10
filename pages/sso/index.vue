<template>
  <div class="sso" fixed top-0 left-0 w-full h-full flex items-center justify-center>
    <div class="layout" bg-white rounded shadow-lg m-2>

    </div>
  </div>
</template>

<script setup>
/**
 * 
 * 
 */
import { computed, markRaw, onMounted, reactive, toRefs } from "vue";
const state = reactive({
  name:'youloge.sso',
  version:'v1.1.4',
  hash:location.hash,
  referrer:document.referrer,
  uage:navigator.language.toLowerCase(),
  mask:false,
  close:true
});
onMounted(()=>{
  let Params = new URL(location.href).searchParams
  let hash = Params.get('hash')
  let method = Params.get('state')
  let params = Params.get('code')
  if(method && params){
    localStorage.setItem('youloge.sso',new Date().getTime())
  }
  // 关闭窗口 与跳转
  window.close();location.href ='/';
})
const {name} = toRefs(state)
</script>

<style lang="scss">

</style>