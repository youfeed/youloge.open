<template>
  <div class="y-captcha" @click="onHcaptcha">
    <div class="y-captcha-shadow">
      <h1>Youloge.Captcha</h1>
      <TransitionGroup name="list" tag="div" class="y-captcha-group">
        <div v-for="item in group" :key="item" class="y-captcha-item">
          <img :src="item.icon" alt=""> <span v-text="onDiff(item)"></span>
        </div>
      </TransitionGroup>
      <div class="g-captcha" ></div>
      <div class="turnstile"></div>
    </div>
  </div>
</template>
<script setup>
/**
 * Youloge.Captcha 人机验证：
 * 用了二家服务：谁快用谁，任意一家通过都算 
 * 验证成功自动分配匿名用户300秒
 * 你可以使用自己的验证服务：鉴权签名使用开发者签名即可7天
 * 参阅：https://docs.youloge.com/plus#captcha
 */
import { onMounted,onBeforeMount,reactive,onBeforeUpdate, toRefs, computed } from 'vue'
const state = reactive({
  name:'youloge.captcha',
  version:'1.1.3',
  hash:location.hash,
  referrer:document.referrer,
  uage:navigator.language.toLowerCase(),
  ukey:'',
  // 密钥池
  sitekey:{
    'turnstile':'0x4AAAAAAAJ_grIgkDnuX3-d',
    'grecaptcha':'6LexS_AUAAAAAH9UdBivITFTlZg2su7_OLIc7aM1',
  },
  turnstile:'0x4AAAAAAAJ_grIgkDnuX3-d',
  grecaptcha:'6LexS_AUAAAAAH9UdBivITFTlZg2su7_OLIc7aM1',
  // 剔除hcaptcha 
  // hcaptcha:'84c28ea5-62e0-408d-b964-304e3ca7a3c6',
  // 启动池
  group:{
    'turnstile':{
      key:'0x4AAAAAAAJ_grIgkDnuX3-d',
      icon:'https://dash.cloudflare.com/favicon.ico',
      start:performance.now(),
      end:performance.now(),
      status:'load'
    },
    'grecaptcha':{
      key:'0x4AAAAAAAJ_grIgkDnuX3-d',
      icon:'https://ssl.gstatic.com/recaptcha/express_onboarding/favicon.ico',
      start:performance.now(),
      end:performance.now(),
      status:'load'
    }
  },
  mask:false,
});
onMounted(() => {
  window.self === window.top ? location.href ='/' : SendMessage('ready',{msg:'youloge.captcha is ready'});
  const {referrer,hash,ukey} = state;
  window.addEventListener('message',({origin,data,source})=>{
    let {method,params} = data[hash] || {};
    if(referrer.startsWith(origin) && method && ukey == ''){
      let work = {
        'init':()=>{
          console.log('onMounted',params);
          params.ukey.length < 64 && SendMessage('error',{msg:'Ukey undefined'});
          state.host = new URL(origin).hostname;
          state.ukey = params.ukey;
          state.close = params.close;
          console.log('onReady-init',hash);
          onReady();
        }
      };
      work[method] ? work[method]() : console.log('not method');
    }
  })
})
// 直接签发认证
const onReady = (global=['grecaptcha','turnstile'])=>{
  const active = global.filter(is=>window[is]);
  active.forEach(item=>{
    console.log('onReady',item);
    state.group[item].status = 'work'
    let _ = {
      'grecaptcha':()=>onRcaptcha(),
      'turnstile':()=>onTurnstile(),
    }[item]();
  });
  let diff = global.filter(is =>!active.includes(is));
  diff.length && setTimeout(()=>{onReady(diff)},10);
}
const onDiff = computed((item)=>{
  return (item)=>{
    let {start,status} = item;
    return status=='work'? ((performance.now() - start) / 1000).toFixed(4) : status;
  }
})
// captcha 留给自家用吧~ 将来走行为验证~
// Cloudflare
const onTurnstile = ()=>{
  var widgetID = turnstile.render('.turnstile', {
    sitekey: state.turnstile,
    action:'homepage',
    callback: function(token) {
      onFetch('turnstile',{token:token}).then(({expire,signature})=>{
        state.group['turnstile'].status = 'ok';
        SendMessage('success',{'expire':expire,signature:signature})
      }).catch(err=>{
        state.group['turnstile'].status = err;
        // SendMessage('error',{msg:'res',err})
        console.log('SendMessage.catch()',err);
      }).finally(()=>{
        state.group['turnstile'].end = performance.now();
        SendMessage('turnstile',{msg:'performance',res:state.group['turnstile']})
      })
    },
  })
  console.log('onTurnstile',turnstile,widgetID);
}
// Google
const onRcaptcha = ()=>{
  console.log('onRcaptcha',grecaptcha,state.grecaptcha);
  window.grecaptcha.ready(()=>{ 
    window.grecaptcha.execute(state.grecaptcha, {action: 'submit'}).then(function(token) {
      onFetch('recaptcha',{token:token}).then(({expire,signature})=>{
        state.group['turnstile'].status = 'ok';
        SendMessage('success',{'expire':expire,signature:signature})
      }).catch(err=>{
        state.group['turnstile'].status = err;
      }).finally(()=>{
        state.group['grecaptcha'].end = performance.now();
        SendMessage('grecaptcha',{msg:'performance',res:state.group['grecaptcha']})
      })
    });
  })

}
// 发起请求 params [] 批量 {} 单条
const onFetch = (method,params={})=>(state.mask = true,new Promise((resolve,reject)=>{
  fetch('https://api.youloge.com/captcha',{
    method:'post',
    headers:{ukey:state.ukey,lang:state.lang,"Content-Type": "application/json"},
    body:JSON.stringify({method:method,params:params})
  }).then(r=>r.json()).then(({err,msg,data})=>{
    err == 200 ? resolve(data) : reject(msg);
  }).catch(err=>{
    reject(err);
  }).finally(()=>{
    state.mask = false;
  })
}))
// SendMessage
const SendMessage = (method,params={})=>{
  let {hash,referrer} = state;
  referrer && window.parent.postMessage({ [hash]:{method:method,params:params} }, referrer);
}
const {group} = toRefs(state);
</script>
<style lang="scss">
.y-captcha{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: fixed;
  width: 100%;
  height: 100%;
  .y-captcha-shadow{
    background: #fff;
    padding: 10px;
    box-shadow: 1px 1px 0px #333;
    border-radius: 5px;
  }
  .y-captcha-group{
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    .y-captcha-item{
      position: relative;
      width: 60px;
      height: 60px;
      span{
        position: absolute;
        bottom: 0;
        left: 50%;
        text-align: center;
        transform: translateX(-50%);
      }
    }
  }
}
.grecaptcha-badge { 
  visibility: hidden; 
}
.rc-anchor-normal-footer {
  // display: none !important;
}
</style>