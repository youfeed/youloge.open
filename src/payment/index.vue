<template>
  <div class="y-payment" fixed top-0 left-0 w-full h-full flex items-center justify-center @click.stop="onCloseAll" :class="{loading:loading}">
    <form class="layout" ref="ref" bg-white rounded shadow-lg m-2 flex flex-col p-2 @submit.prevent="onVerify" @reset.prevent="getCode">
      <div class="head" h-8 relative b-b b-b-black >
        <div class="close" @click="onClose" absolute top-1 right-1 hover:color-blue>
          <svg width="24" height="24" viewBox="0 0 24 24" focusable="false"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="currentColor"></path></svg>
        </div>
        <div class="title" >
          <span font-size-4>余额支付：</span>
          <span color-indigo v-text="msg"></span>
        </div>
      </div>
      <div class="body" flex-auto  p-2>
        <div bg-gray-1 p-2 rouned>
          <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px dotted #666; padding-bottom: 10px;">
            <span>账户：{{mail}}</span>
            <span style="color: #6028e4;cursor: pointer;" @click="onDeposit">扫码充值</span>
          </div>
          <div style=" display: flex; align-items: center; justify-content: space-between; padding-top: 10px;">
            <span>支付积分</span>
            <span style="color: #666;">参考金额</span>
          </div>
          <div style="display: flex; align-items: flex-end; justify-content: space-between; height: 40px;">
            <div style="color: #0ac265;"># <span style="font-weight: 400;font-size: 24px;">{{(money / 100).toFixed(2)}}</span> RGB</div>
            <div>≈</div>
            <div style="color: #666;">¥ {{(money / 100).toFixed(4)}} CNY</div>
          </div>
        </div>
        <div style="margin-top: 20px;">
          <div class="y-password">
            <input id="paycode" v-model="code" class="input" type="text" placeholder="" autocomplete="off" :readonly="!signer" pattern="[abcdefghjklmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789]{5}" minlength="5" maxlength="5" required/>
            <label for="paycode" data-title="✔" :title="`支付码 - ${random}`"></label>
            <button type="reset">获取支付码</button>
          </div>
          <div style="height: 80px;display: flex;align-items: center;justify-content: center;">
            <input type="text" name="signer" v-model="signer" required style="display: none;">
            <button type="submit"> 确认支付 </button>
          </div>
        </div>
        <div>
        </div>
      </div>
      <!-- <div v-html="exCurrency(200,'CNY')"></div> -->
      <div class="foot" style="display: flex;justify-content: space-between;    font-size: 12px;">
        <div class="source" title="源站"><span>{{host}}</span></div>
        <a class="create" href="//docs.youloge.com/open/payment/" target="_blank" v-text="version" title="版本" style="color: #666;text-decoration: none;"></a>
      </div>
    </form>
    <div class="y-deposit" v-if="deposit.show" style=" flex-direction: column; background: #c1c1c1; padding: 10px; border-radius: 5px; position: fixed; display: flex; align-items: center;min-width: 350px; ">
      <select name="233" v-model="deposit.value" @change="seDeposit" class="select" style=" background: transparent; border: 0; height: 30px; font-size: 16px; margin-bottom: 20px; outline: 0; ">
        <option :value="deposit.value">¥ {{ (deposit.value / 100).toFixed(2) }} CNY</option>
        <option :value="money">¥ {{ (money/ 100).toFixed(2) }} CNY</option>
        <option value="1000">¥ 10.00 CNY</option>
        <option value="3000">¥ 30.00 CNY</option>
        <option value="9900">¥ 99.00 CNY</option>
        <option value="30000">¥ 300.00 CNY</option>
        <option value="64800">¥ 648.00 CNY</option>
      </select>
      <div>
        <img :src="deposit.src" >
      </div>
      <div>微信·支付宝</div>
      <button @click="unDeposit" style=" padding: 5px 18px; margin-top: 20px; border-radius: 5px; outline: 0; border: 0; cursor: pointer; background: #4CAF50; color: #fff; ">我已扫码</button>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, toRefs } from "vue";
/**
 * mail money ukey notify | close
 * 邮箱->支付码->预支付->notify->[确认收单->确认支付]->success->支付完成
 */
const state = reactive({
  name:'youloge.payment',
  version:'v0.5.8',
  hash:location.hash,
  referrer:document.referrer,
  uage:navigator.language.toLowerCase(),
  ref:null,loading:true,

  ukey:'',
  notify:'',
  local:'',
  mail:'',
  money:0,
  msg:'安全邮箱+支付码=付款成功',
  random:'请先获取一次性支付码',
  signer:null,
  code:null,
  host:null,
  close:false,
  //
  deposit:{
    value:100,
    src:'',
    show:false
  }
});
onMounted(()=>{
  // window.self === window.top ? location.href ='/' : 
  SendMessage('ready',{msg:'youloge.payment is ready'});
  window.addEventListener('message',onMessage,false);
  // window.grecaptcha.ready(()=>{
  //   window.grecaptcha.execute(state.grecaptcha, {action: 'submit'}).then((token)=>{
  //     console.log(grecaptcha,token)
  //   })
  // }) 
})
// 监听消息
const onMessage = ({origin,data,source})=>{
  let {referrer,hash,ukey} = state;
  let {method,params} = data[hash] || {};
  if(referrer.startsWith(origin) && method && ukey == ''){
    let work = {
      'init':()=>{
        state.loading = false;
        state.host = new URL(origin).hostname;
        // Object.assign(state,data); mail money ukey notify
        console.log('youloge.payment onMessage',params,state,data);
        ({
          mail:state.mail = '',
          money:state.money = '',
          ukey:state.ukey = '',
          notify:state.notify = '',
          local:state.local = '',
          close:state.close = false,
          uuid:state.uuid = null
        } = params)
        params.ukey.length < 64 && SendMessage('error',{msg:'Ukey undefined'});
        onReady();
      }
    };
    work[method] ? work[method]() : console.log('not method');
  }
}
// 准备完成
const onReady = ()=>{
  console.log('ready',state);
}
// 获取支付
const getCode = ()=>{
  let {mail,money,local} = state
  onFetch('wallet','code',{mail,money,local}).then(({random,signer,expire})=>{
    state.random = random,
    state.signer = signer;
    state.expire = expire;
  }).catch((msg)=>{
    state.msg = msg
  })
}
// 验证支付
const onVerify = (e)=>{
  let {signer,code} = state
  onFetch('wallet','verify',{signer,code}).then(res=>{
    console.log('pay',res);
    onNotify(res.signature);
  }).catch(msg=>{
    state.msg = msg
    console.log('pay',msg);
  })
}
// 支付通知
const onNotify = (signature)=>{
  let {notify,} = state;
  fetch(notify,{method:'POST',header:{signature:signature},body:JSON.stringify({method:'notify',params:{uuid:'uuid',signature:signature}})}).then(r=>r.json()).then(res=>{
    if(res.err == 200){
      SendMessage('success',{msg:'支付成功'});
    }else{
      SendMessage('error',{msg:'通知失败','signature':signature,notify:res});
    }
  }).catch(err=>{
    SendMessage('error',{msg:err});
    console.log('onNotify catch',err);
  })
}
// 扫码充值
const onDeposit = ()=>{
  let {mail,money} = state;state.deposit.show = true;
  onFetch('wallet','deposit',{mail:mail,money:money}).then(res=>{
    state.deposit.value = money;
    let data = encodeURIComponent(res.qrcode);
    state.deposit.src = `https://qun.qq.com/qrcode/index?data=${data}`
    console.log('deposit',res);
  })
}
// 更换金额
const seDeposit = ()=>{
  let {mail,deposit} = state,{value} = deposit;
  onFetch('wallet','deposit',{mail:mail,money:value}).then(res=>{
    state.deposit.value = value;
    let data = encodeURIComponent(res.qrcode);
    state.deposit.src = `https://qun.qq.com/qrcode/index?data=${data}`
    console.log('deposit',res);
  })
  console.log('seDeposit',value);
}
// 关闭充值
const unDeposit = ()=>{
  state.deposit.show = false;
}
// 参考汇率
const exCurrency = (int,alpha='CNY',digits=4)=>{
  // currency (100.25456).toLocaleString('en-US',{style: 'currency',currency:'CNY',minimumFractionDigits: 2,maximumFractionDigits: 4})
  let [symbol,digit,title] = {
    'CNY':['¥','0.9999','人民币'],
    'JPY':['¥','20.5300','日元'],
    'USD':['$','0.1369','美元'],
    'GBP':['£','0.1133','英镑'],
    'EUR':['€','0.1308','欧元'],
    'RUB':['₽','0.1308','卢布'],
  }[alpha];
  if(symbol == undefined) `<div class="y-currency">未找到参考货币</div>`

  return `<div class="y-currency" title="${title}"><span class="y-symbol">${symbol}</span><span class="y-digit">${(int / 100 * digit).toFixed(digits)}</span><span class="y-alpha">${alpha}</span></div>`
  //  `<div class="y-currency">未找到参考货币</div>`;

  // 'USD':'$ 美元',
  // 'EUR':'€ 欧元',
  // 'JPY':'¥ 日元',
  // 'GBP':'£ 英镑',
  // 'HKD':'$ 港币',
  // 'AUD':'$ 澳元',
  // 'CAD':'$ 加元',
  // 'SGD':'$ 新加坡元',
  // 'NZD':'$ 新西兰元',
  // 'CHF':'$ 瑞士法郎',
}
// 遮罩关闭
const onCloseAll = (e)=>{
  state.ref.contains(e.target) || state.close &&  SendMessage('error',{msg:'遮罩层关闭'});
}
// 按钮关闭
const onClose = ()=>SendMessage('error',{msg:'关闭按钮关闭'})
// 发起请求 params [] 批量 {} 单条
const onFetch = (route,method,params={})=>(state.loading = true,new Promise((resolve,reject)=>{
  fetch(`https://api.youloge.com/${route}`,{
    method:'post',
    headers:{ukey:state.ukey,lang:state.lang,"Content-Type": "application/json"},
    body:JSON.stringify({method:method,params:params})
  }).then(r=>r.json()).then(({err,msg,data})=>{
    err == 200 ? resolve(data) : reject(msg);
  }).catch(err=>{
    reject(err);
  }).finally(()=>{
    state.loading = false;
  })
}))
// 
const SendMessage = (method,params={})=>{
  let {hash,referrer} = state;
  referrer && window.parent.postMessage({ [hash]:{method:method,params:params} }, referrer);
}
const {ref,msg,host,code,mail,money,version,random,signer,loading,deposit} = toRefs(state)
</script>

<style lang="scss">
.grecaptcha-badge{visibility: hidden;}
.y-payment {
  .layout{
    width: min(400px, 100vw);
    min-height: min(300px, 90%);
  }
  .y-password{
    position: relative;
    margin-bottom: 15px;
  }

  label::before,
  .y-password input:valid + label::before,
  .y-password input:focus + label::before {
    line-height: 20px;
    font-size: 12px;
    top: -10px;
    background: #fff;
    padding: 0 6px;
    left: 9px;
  }
  .y-password label::before {
    content: attr(title);
    pointer-events: none;
    position: absolute;
    top: 1px;
    left: 15px;
    line-height: 40px;
    font-size: 14px;
    color: #777;
    transition: 300ms all;
  }
  .y-password input {
    width: 100%;
    line-height: 40px;
    padding: 0 15px;
    box-sizing: border-box;
    font-size: 14px;
    color: #222;
    border: 1px solid #ccc;
    border-radius: 3px;
    text-align: center;
    letter-spacing: .85em;
    text-transform: uppercase;
    font-weight: bold;
  }
  .y-password input:focus {
    outline: 0;
    border-color: blue;
  }
  .y-password input:valid + label::before {
    content: attr(data-title);
  }
  .y-password input:focus + label::before {
    color: blue;
  }
  button[type='submit']{
    pointer-events: none;
    opacity: .5;
    background: #1AAD19; 
    color: #FFFFFF; 
    font-size: 18px; 
    padding: 6px 20px; 
    border: 0px; 
    border-radius: 3px;
    
  }
  button[type='reset']{
    position: absolute;
    width: 100px;
    right: 0;
    top: 1px;
    height: 40px;
    background: transparent;
    color: #03A9F4;
    border: 0;
    border-radius: 3px;
    cursor: pointer;
    &:hover{
      opacity: .7;
    }
  }
  form:valid button[type='submit']{
    cursor: pointer;
    pointer-events: all;
    opacity: 1;
    &:hover{
      opacity: .8;
    }
  }
}
.loading{
  pointer-events: none;
  opacity: 0.9;
}
.loading::before{
  z-index: 1000;
  content: '';
  position: fixed;
  width: 30px;
  height: 30px;
  border: 2px solid #000;
  border-top-color: transparent;
  border-radius: 100%;
  animation: 0.5s keyloading infinite;
}
@keyframes keyloading {
  0% { transform: rotate(0); }
  100% { transform: rotate(360deg); }
}
</style>