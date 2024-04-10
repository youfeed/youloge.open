<template>
  <div class="sso"  @click.stop="onCloseAll" fixed top-0 left-0 w-full h-full flex items-center justify-center  :class="{loading:loading}">
    <div class="layout" ref="ref" bg-white rounded shadow-lg m-2>

      <div class="head">
        <div class="close" @click="onClose">
          <svg width="24" height="24" viewBox="0 0 24 24" focusable="false"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="currentColor"></path></svg>
        </div>
        <div class="title" v-text="lang('title')"></div>
        <div class="progress"><span class="rate"></span></div>
      </div>

      <div class="body quick" v-show="mode=='quick'">
        <template v-for="item in account" :key="item.uuid">
          <div class="profile" @click="onQuick(item)">
            <div class="avatar">
              <img :src="'//img.youloge.com/'+item.avatar+'!80'">
            </div>
            <div class="account">
              <div class="name">{{item.name}}</div>
              <div class="mail">{{item.mail}}</div>
            </div> 
          </div>
        </template>
        <div class="profile" @click="onToggle">
          <div class="avatar">
            <img src="//img.youloge.com/FjjHFE7RwJqfjiwM9aqL4G53kPv3!80">
          </div>
          <div class="account ">
            <div class="name" style="color:#03a9f4" v-text="lang('newaccount')"></div>
            <div class="mail" v-text="lang('newlogin')"></div>
          </div>
        </div>
        <div class="profile" @click="onGithub">
          <div class="avatar">
            <svg t="1712744687732" class="icon" viewBox="0 0 1206 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9136" width="100%" height="100%"><path d="M139.995429 262.546286s-122.294857 127.963429-101.046858 336.164571c21.248 208.237714 153.088 380.050286 592.749715 380.050286 439.625143 0 550.217143-229.485714 552.813714-418.230857 2.596571-188.672-82.395429-272.822857-122.294857-301.458286 0 0 0.256-135.460571-12.544-207.030857 0 0-67.657143-8.009143-213.76 75.702857 0 0-199.460571-19.492571-465.261714 2.377143 0 0-111.652571-74.605714-224.146286-94.134857 0 0-18.651429 117.467429-6.509714 226.56z" fill="#333333" p-id="9137"></path><path d="M336.859429 468.662857h545.499428s154.587429-17.371429 154.587429 235.52c1.243429 222.573714-407.369143 208.201143-407.369143 208.201143s-447.488 17.773714-447.744-229.266286c-0.585143-223.085714 155.026286-214.454857 155.026286-214.454857z" fill="#E2B89F" p-id="9138"></path><path d="M832.621714 570.185143c35.072 0 63.524571 45.714286 63.524572 101.924571 0 56.32-28.452571 101.961143-63.524572 101.961143-35.035429 0-63.488-45.641143-63.488-101.961143-0.036571-56.210286 28.452571-101.924571 63.488-101.924571z" fill="#9C584F" p-id="9139"></path><path d="M832.621714 792.356571c-45.860571 0-81.773714-52.809143-81.773714-120.246857 0-67.401143 35.913143-120.210286 81.773714-120.210285 45.897143 0 81.810286 52.809143 81.810286 120.210285 0 67.437714-35.949714 120.246857-81.810286 120.246857z m0-203.885714c-21.394286 0-45.202286 34.340571-45.202285 83.638857 0 49.334857 23.808 83.675429 45.202285 83.675429s45.238857-34.340571 45.238857-83.675429c0-49.298286-23.844571-83.638857-45.238857-83.638857z" fill="#FFFFFF" p-id="9140"></path><path d="M393.764571 570.185143c35.072 0 63.524571 45.714286 63.524572 101.924571 0 56.32-28.452571 101.961143-63.524572 101.961143-35.035429 0-63.488-45.641143-63.488-101.961143-0.036571-56.210286 28.452571-101.924571 63.488-101.924571z" fill="#9C584F" p-id="9141"></path><path d="M393.764571 792.356571c-45.860571 0-81.773714-52.809143-81.773714-120.246857 0-67.401143 35.913143-120.210286 81.773714-120.210285 45.860571 0 81.810286 52.809143 81.810286 120.210285 0 67.437714-35.949714 120.246857-81.810286 120.246857z m0-203.885714c-21.394286 0-45.202286 34.340571-45.202285 83.638857 0 49.334857 23.808 83.675429 45.202285 83.675429s45.238857-34.340571 45.238858-83.675429c0-49.298286-23.844571-83.638857-45.238858-83.638857z" fill="#FFFFFF" p-id="9142"></path><path d="M587.922286 793.782857s18.249143-51.858286 40.557714-3.254857c0 0-16.713143 10.861714-10.422857 36.425143l52.224 19.968h-118.125714l46.811428-21.028572s6.729143-38.619429-11.044571-32.109714z" fill="#9C584F" p-id="9143"></path></svg>
          </div>
          <div class="account ">
            <div class="names" style="color:#03a9f4">GITHUB 快捷登录</div>
          </div>
        </div>
        <div class="profile" @click="onGoogle">
          <div class="avatar">
            <svg t="1712745515149" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10142" width="100%" height="100%"><path d="M214.101333 512c0-32.512 5.546667-63.701333 15.36-92.928L57.173333 290.218667A491.861333 491.861333 0 0 0 4.693333 512c0 79.701333 18.858667 154.88 52.394667 221.610667l172.202667-129.066667A290.56 290.56 0 0 1 214.101333 512" fill="#FBBC05" p-id="10143"></path><path d="M516.693333 216.192c72.106667 0 137.258667 25.002667 188.458667 65.962667L854.101333 136.533333C763.349333 59.178667 646.997333 11.392 516.693333 11.392c-202.325333 0-376.234667 113.28-459.52 278.826667l172.373334 128.853333c39.68-118.016 152.832-202.88 287.146666-202.88" fill="#EA4335" p-id="10144"></path><path d="M516.693333 807.808c-134.357333 0-247.509333-84.864-287.232-202.88l-172.288 128.853333c83.242667 165.546667 257.152 278.826667 459.52 278.826667 124.842667 0 244.053333-43.392 333.568-124.757333l-163.584-123.818667c-46.122667 28.458667-104.234667 43.776-170.026666 43.776" fill="#34A853" p-id="10145"></path><path d="M1005.397333 512c0-29.568-4.693333-61.44-11.648-91.008H516.650667V614.4h274.602666c-13.696 65.962667-51.072 116.650667-104.533333 149.632l163.541333 123.818667c93.994667-85.418667 155.136-212.650667 155.136-375.850667" fill="#4285F4" p-id="10146"></path></svg>
          </div>
          <div class="account ">
            <div class="names" style="color:#03a9f4">Google 快捷登录</div>
          </div>
        </div>
      </div>

      <div class="body normal" v-show="mode=='normal'">
        <form @submit.prevent="onSubmit">
          <div>
            <div class="field">
              <input id="mail" type="email" v-model="toggled.mail" required autocomplete="off">
              <label for="mail" :title="lang('email')" data-title="✔"></label>
              <button class="getcode" @click="onCode" v-text="lang('otpcode')"></button>
            </div>
          </div>
          
          <div>
            <div class="field">
              <input id="code" type="text" v-model="toggled.code" required :disabled="!toggled.random" autocomplete="off" pattern="[abcdefghjklmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789]{5}" minlength="5" maxlength="5">
              <label for="code" :title="lang('otpcode')+'-'+toggled?.random" data-title="✔"></label>
            </div>
          </div>
          
          <div>
            <input class="sso-submit" type="submit" :value="lang('confirm')">
            <input class="sso-cancel" type="reset"  :value="lang('reset')">
          </div>
        </form>
      </div>

      <div class="foot">
        <div class="source" title="源站"><span>{{host}}</span></div>
        <a class="create" href="//docs.youloge.com/plus/#sso" target="_blank" v-text="version" title="版本"></a>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * 相同Ukey 直接快捷登录
 * 其他Ukey 免输入邮箱->验证码->登录
 */
import { computed, markRaw, onMounted, reactive, toRefs } from "vue";
const state = reactive({
  name:'youloge.login',
  version:'v1.1.8',
  hash:location.hash.split('#').join(''),
  referrer:document.referrer,
  uage:navigator.language.toLowerCase(),
  ukey:'',
  mask:false,
  loading:true,
  account:[], // 本地缓存账户
  // 选中账户
  toggled:{
    uuid:'',
    random:'',
    access:'',
    secret:'',
    expire:'',
    mail:'',
    code:'',
    created:'',
    updated:''
  },
  grecaptcha:'6LexS_AUAAAAAH9UdBivITFTlZg2su7_OLIc7aM1',
  mode:'quick',// quick normal
  host:'未知',
  ref:null,
  close:true
});
const lang = (key)=>({
  email:['邮箱','Email'],
  title:['登录·注册','Log In Register'],
  newaccount:['使用新账户','Use New Account'],
  newlogin:['安全邮箱登录','Secure Email Login'],
  otpcode:['安全验证码','OTP Code'],
  confirm:['确认','Confirm'],
  reset:['重置','Reset'],
  afresh:['重新获取','Try Again']
}[key][+!state.uage.startsWith('zh')]);
onMounted(()=>{
  // 禁止本地
  window.self === window.top ? location.href ='/' : SendMessage('ready',{msg:'youloge.login is ready'});
  // 接收初始参数
  const {referrer,hash,ukey} = state;
  window.addEventListener('message',({origin,data,source})=>{
    console.log('init000000000',hash,data,params)
    let {method,params} = data[hash] || {};
    if(referrer.startsWith(origin) && method && ukey == ''){
      let work = {
        'init':()=>{
          // state.ukey = params.ukey;
          console.log('init111111',hash,params)
          state.host = new URL(origin).hostname;
          ({
            ukey:state.ukey,
            close:state.close = false,
            uuid:state.uuid = null 
          } = params)
          params.ukey.length < 64 && SendMessage('error',{msg:'Ukey undefined'});
          state.loading = false;
          // onRefresh();
        },
        // github code
        'github':()=>{
          console.log('github',params)
        }
      };
      work[method] ? work[method]() : console.log('not method');
    }
  })
  // 64fe236d29b069848f0d0402
  // window.grecaptcha.ready(()=>{
  //   window.grecaptcha.execute(state.grecaptcha, {action: 'submit'}).then((token)=>{
  //     // console.log(grecaptcha,token)
  //   })
  // })       
})
const getStorage = (key)=>JSON.parse(localStorage.getItem(key) || '[]');
const setStorage = (key,val=[])=>localStorage.setItem(key,JSON.stringify(val));

// 监听缓存
window.onstorage = ()=>{
  console.log('onstorage',state,window.localStorage);
}
// 关联账户
const onToggle = ()=>{
  console.log('onToggle',state.mode == 'quick')
  state.mode = (state.mode == 'quick') ? 'normal' : 'quick';
  console.log('onToggle',state.mode)
}
// 获取验证码
const onCode = ()=>{
  let {mail} = state.toggled;state.sign = true;
  window.grecaptcha.execute(state.grecaptcha, {action: 'submit'}).then((token)=>{
    console.log(mail,token)
    onFetch('login/code',{mail:mail,captcha:token}).then((data)=>{
      state.toggled.access = data.access
      state.toggled.random = data.random
    }).catch((err)=>{
      // 弹窗提示错误
      alert(err)
    })
  })
}
// 验证验证码
const onSubmit = ()=>{
  let {access,code} = state.toggled;
  onFetch('login/verify',{access:access,code:code}).then((data)=>{
    let {uuid,secret,expire} = data;
    state.toggled.uuid = uuid;
    state.toggled.secret = secret;
    state.toggled.expire = expire;
    // 保存账户
    let index = state.account.findIndex(item=>item.uuid == uuid);
    index == -1 ? state.account.unshift(data) : state.account[index] = data;
    setStorage('account',state.account);
    // 直接授权
    onAuthorize();
  }).catch((err)=>{})
}
// 快捷登录 - 
const onQuick = (event)=>{
  Object.assign(state.toggled,event);
  // 尝试授权签名
  onAuthorize();
}
// 刷新登录 - refresh
const onRefresh = ()=>{
  state.account = getStorage('account');
  let params = state.account.map(({secret})=>({secret:secret}));
  params.length && onFetch('login/refresh',params).then(data=>{
    state.account = data.filter(item=>item.uuid);
    setStorage('account',state.account);
  });
}
// 第三方登录
const onGithub = ()=>{
  let {hash} = state;
  // 弹窗提示错误
  let url = encodeURI(`https://open.youloge.com/sso?hash=${hash}`)
  window.open(`https://github.com/login/oauth/authorize?client_id=dbd8d6f97cebac5b5e28&redirect_uri=${url}&scope=user:email&state=github`,
  'Github',
  'popup=1,left=300,top=300,width=500,height=600');
  console.log('onGithub')
}
// 第三方登录 
const onGoogle = ()=>{
  console.log('onGoogle')
}
// 授权签名
const onAuthorize = ()=>{
  let {uuid,secret} = state.toggled;
  onFetch('login/authorize',{secret:secret}).then(({signature,expire})=>{
    let account = state.account.find(item=>item.uuid == uuid);
    account.expire = expire;
    account.signature = signature;
    SendMessage('success',Object.assign(markRaw({}),account));
  }).catch((err)=>{
    // 失败请求验证码
    onToggle();
  })
}
// 发起请求 params [] 批量 {} 单条
const onFetch = (router,params={})=>(state.loading = true,new Promise((resolve,reject)=>{
  fetch(`https://api.youloge.com/${router}`,{
    method:'post',
    headers:{ukey:state.ukey,lang:state.lang,"Content-Type": "application/json"},
    body:JSON.stringify(params)
  }).then(r=>r.json()).then(({err,msg,data})=>{
    err == 200 ? resolve(data) : reject(msg);
  }).catch(err=>{
    reject(err);
  }).finally(()=>{
    state.loading = false;
  })
}))
// 关闭遮罩
const onCloseAll = (e)=>{
  state.ref.contains(e.target) || state.close &&  SendMessage('error',{msg:'遮罩层关闭'});
}
// 关闭弹窗
const onClose = ()=>SendMessage('error',{msg:'关闭按钮关闭'})
// SendMessage
const SendMessage = (method,params={})=>{
  let {hash,referrer} = state;
  referrer && window.parent.postMessage({ [hash]:{method:method,params:params} }, referrer);
}
const {ref,msg,host,mode,close,account,version,toggled,loading} = toRefs(state)
</script>

<style lang="scss">
.grecaptcha-badge{visibility: hidden;}

.sso{
  .layout{
    width: min(400px, 100vw);
    min-height: min(200px, 90%);
  }
  // background: #f00;
  .stop{
    opacity: .5;
    pointer-events: none;
  }
  .head{
    .title{
      color: #2e2e2e;
      font-size: 24px;
      font-weight: 400;
      padding: 10px;
    }
    .close{
      cursor: pointer;
      float: right;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #9E9E9E;
      &:hover{
        color: #4d4d4d;
      }
    }
  }
  .quick{
    flex: 1;
    overflow-y: scroll;
    .profile{
      cursor: pointer;
      display: flex;
      align-items: center;
      margin: 5px;
      border: 1px solid #ddd;
      border-radius: 5px;
      &:hover{
        background: #fff;
      }
      .avatar{
        width: 70px;
        height: 70px;
        border-radius: 50%;
        overflow: hidden;
        padding: 5px;
        img{
          max-width: 100%;
        }
      }
      .account{
        margin-left: 10px;
        .name{
          font-size: 18px;
          color: #333;
        }
        .mail{
          margin-top: 5px;
          font-size: 14px;
          color: #999;
        }
      }
    }
  }
  .body{
    max-height: 400px;
    padding: 10px;
    .label::before,
    .field input:valid + label::before,
    .field input:focus + label::before {
      line-height: 20px;
      font-size: 12px;
      top: -10px;
      background: #fff;
      padding: 0 6px;
      left: 9px;
    }
    .field {
      position: relative;
      margin-bottom: 15px;
    }
    .field label::before {
      content: attr(title);
      pointer-events: none;
      position: absolute;
      top: 0;
      left: 15px;
      line-height: 40px;
      font-size: 14px;
      color: #777;
      transition: 300ms all;
    }
    .field input {
      width: 100%;
      line-height: 40px;
      padding: 0 15px;
      box-sizing: border-box;
      font-size: 14px;
      color: #222;
      border: 1px solid #ccc;
      border-radius: 3px;
      text-align: center;
    }
    .field input:focus {
      outline: 0;
      border-color: blue;
    }
    .field input:valid + label::before {
      content: attr(data-title);
    }
    .field input:focus + label::before {
      color: blue;
    }
    input#mail:valid ~ .getcode{
      display: block;
      color: blue;
    }
    input#mail{
      letter-spacing: .1em;
      font-size: 14px;
      text-transform: lowercase;
    }
    input#code{
      letter-spacing: 2em;
      font-weight: 800;
      font-size: 18px;
      text-transform: uppercase;
    }
    .getcode{
      position: absolute;
      right: 0;
      top: 0;
      color: #2196F3;
      border: 0;
      padding: 5px;
      background: transparent;
      cursor: pointer;
      display: none;
      height: 100%;
    }
    input[type='submit'],input[type='reset']{
      width: 100%;
      height: 40px;
      background: #09F;
      color: #fff;
      border: 1px solid #03A9F4;
      border-radius: 3px;
      margin-top: 20px;
      cursor: pointer;
      &:hover{
        opacity: .7;
      }
    }
    input[type='reset']{
      background: #eee;
      color: #333;
      border: 1px solid #03A9F4;
    }
    .submit{
      margin: 20px;
      background: #09F;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      color: #fff;
      cursor: pointer;
    }
  }
  .foot{
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5px;
    .create{
      cursor: pointer;
      color: #4f4f4f;
      text-decoration: none;
    }
    .source{
      color: #4caf50;
    }
  }
  .progress{
    height: 4px;
    position: relative;
    margin-bottom: 10px;
    width: 100%;
    background: #2196f3;
    .rate{
      height: 4px;
      position: absolute;
    }
  }
}
.mask{
  opacity: 0.7;
  pointer-events: none;
  .rate{
    width:100% !important;
    animation:.5s keymask infinite;
  }
}
@keyframes keymask {
  0%{
    background: #00f;
    transform: scaleX(0%);
  }
  50% {
    background: #f00;
    transform: scaleX(50%);
  }
  75%{
    background:#ff0;
    transform: scaleX(75%);
  }
  100% {
    background:#f0f;
    transform: scaleX(100%);
  }
}
::-webkit-scrollbar {
  width: 5px;
  background-color: #f5f5f5;
}
::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 5px;
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