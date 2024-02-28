<template>
  <button class="btn .dark:btn-primary" @click="onGithub">github</button>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { onFetch } from '@/utils/index'
 const state =reactive({
  redirect_uri:'https://open.youloge.com/oauth',
  github:'https://github.com/login/oauth/authorize?client_id=dbd8d6f97cebac5b5e28&scope=user&state=github&redirect_uri=https://open.youloge.com/oauth',
 })
 onMounted(()=>{
  // 获取请求参数
  let code = onQuery('code'),state = onQuery('state');
  onFetch(`login/${state}`,{code:code}).then(res=>{
    console.log(code,state,res)
    
  })
  // 
 })
 //
 const onGithub = ()=>{
  window.open(state.github,'_blank', 'popup,noopener,noreferrer,incognito=yes')
 }
 // 
 const onQuery = (key)=>{
   return new URLSearchParams(location.search).get(key);
 }
</script>

<style>

</style>