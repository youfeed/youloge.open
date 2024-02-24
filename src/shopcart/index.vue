<template>
    <div class="y-shopcart" fixed top-0 left-0 w-full h-full flex items-center justify-center :class="{loading:loading}">
      <div class="layout">
        <div class="head">
          <div class="profile">
            <div>账户：{{mail}}</div>
            <div class="close" @click="onClose" absolute top-1 right-1 hover:color-blue>
              <svg width="24" height="24" viewBox="0 0 24 24" focusable="false"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="currentColor"></path></svg>
            </div>
          </div>
          <div p-1 w-full>
            <div @click="onAddress" style="cursor: pointer; background: rgb(242, 242, 242); padding: 8px; color: rgb(102, 102, 102); border-radius: 5px; border: 1px dotted #9E9E9E;">
              <div>{{shopping.address.name || "收货人"}} {{shopping.address.tel || "电话"}} </div>
              <div>{{shopping.address.district.join(',') || "使用临时地址"}} {{shopping.address.detail}}</div>
            </div>
          </div>
        </div>
        <div class="body">
          <div flex items-center justify-between style=" border-top: 1px solid #d3d3d3; border-bottom: 1px solid #d3d3d3; padding: 5px; ">
            <div style="display: flex; align-items: center; gap: 5px; ">
              <span style="background: #4CAF50; width: 10px; height: 10px; border-radius: 5px;"></span>
              <span>套餐选择</span>
            </div>
            <div>已选 {{calChecked}} 款 {{calServing}} 份</div>
          </div>
          <div class="skus">
            <div class="selected">
              <template v-for="item in skus" :key="item.uuid">
                <div flex items-center v-show="item.checked" class="item">
                  <div>
                    <img :src="`https://img.youloge.com/${item.poster}!80`" height="50">
                  </div>
                  <div flex-auto>
                    <div>{{item.name}}</div>
                    <div style=" display: flex; align-items: center; justify-content: space-between; ">
                      <div>#{{(item.money * item.quantity /100).toFixed(2) }}RGB</div>
                      <div style=" display: flex; align-items: center; gap: 5px; ">
                        <button style=" height: 1.8em; width: 2.2em;" @click="onQuantity(item,false)">-</button>
                        <div class="quantity">
                          <input type="number" v-model="item.quantity" step="1" min="0" :max="item.stock">
                        </div>
                        <button style=" height: 1.8em; width: 2.2em;" @click="onQuantity(item,true)">+</button>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
            <div class="unselect">
              <template v-for="item in skus" :key="item.uuid">
                <div class="item" :hidden="item.checked" @click="onChecked(item)">{{item.name}}</div>
              </template>
            </div>
          </div>
        </div>

        <div class="foot">
          <div style=" text-align: center; border-top: 1px solid #d7d7d7; font-size: 14px; padding: 2px; color: #666; ">购物全程由Youloge担保</div>
          <div @click="onMerge" style=" text-align: center; background: #D32F2F; color: #fff; padding: 15px; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">确认下单 # {{calcTotal}} RGB</div>
        </div>

      </div>
    </div>

    <div class="y-address" v-if="address.show">
      <div class="layout">
        <div class="head">
          <div>收货地址 新增+</div>
        </div>
        <div class="boby">
          <div class="list">
            <template v-for="item in address.list" :key="item.uuid">
              <div class="item">
                <div>xxxxx,17605509012 x</div>
                <div>安徽信息 xx 信息 使用</div>
                <div>设为默认 复制 修改</div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="y-editor" v-if="editor.show">
      <div class="layout">
        <div class="head">编辑收货地址(本地共享)</div>
        <form class="boby" @submit.prevent="editorSave">
          <div class="item">
            <div>收货人</div>
            <input type="text" placeholder="收货人姓名" maxlength="8" v-model="shopping.address.name"   required/>
          </div>
          <div class="item">
            <div>手机号</div>
            <input type="tel" placeholder="收货人手机号" maxlength="11" v-model="shopping.address.tel" pattern="[1][3,4,5,6,7,8,9][0-9]{9}" required/>
          </div>
          <div class="item">
            <div>地区</div>
            <input type="input" @click="district.show=true" placeholder="点击选则" readonly v-model="shopping.address.district" required/>
          </div>
          <div class="item">
            <div>地址</div>
            <textarea type="input" placeholder="建议使用最近的代收点" v-model="shopping.address.detail" required></textarea>
          </div>
          <div class="foot"><button type="submit">保存</button></div>
        </form>
      </div>
    </div>
    <div class="y-district" v-if="district.show">
      <div class="layout">
        <div class="head">
          <template v-if="district.head.province">
            <div @click="district_head('province')">{{district.head.province.name}}</div>
          </template>
          <template v-else>
            <div @click="district_head('province')">请选择</div>
          </template>

          <template v-if="district.head.city">
            <div @click="district_head('city')">{{district.head.city.name}}</div>
          </template>
          <template v-if="district.head.county">
            <div @click="district_head('county')">{{district.head.county.name}}</div>
          </template>
          <template v-if="district.head.street">
            <div @click="district_head('street')">{{district.head.street.name}}</div>
          </template>
        </div>
        <div class="boby">
          <template v-for="item in activeDistrict" :key="item.uuid">
            <div class="item" @click="district_select(item)">{{ item.name }}</div>
          </template>
        </div>
      </div>
    </div>
</template>

<script setup>
import { computed, onMounted, reactive, toRefs } from "vue";
const state = reactive({
  name:'youloge.shopcart',
  version:'v0.3.6',
  hash:location.hash,
  referrer:document.referrer,
  uage:navigator.language.toLowerCase(),
  ref:null,loading:true,

  ukey:'',
  mail:'',
  // 静默登录
  profile:null,
  // SPU SKU
  skus:[],
  // 购物结算
  shopping:{
    uuid:'spu.uuid',
    mail:'',
    address:{
      name:'',
      tel:'',
      district:[],
      detail:''
    },
    skus:[
    ]
  },
  // 收货地址
  address:{
    list:[]
  },
  // 编辑地址
  editor:{
    name:'',
    tel:'',
    district:[],
    detail:''
  },
  // 行政区划
  district:{
    type:'province',
    checked:0,
    head:{
      province:null, 
      city:null, 
      county:null, 
      street:null, 
    },
    list:[],
    root:[],
    province:[],
    city:[],
    county:[],
    street:[]
  }
})
const calChecked= computed(()=>{
  return state.skus.filter(is=>is.checked).length
})
const calServing = computed(()=>{
  return state.skus.reduce((pre,cur)=>pre+(cur.quantity || 0),0)
})
const calcTotal = computed(()=>{
  let total = state.skus.filter(is=>is.checked).reduce((pre,cur)=>(pre+cur.quantity*cur.money),0);
  return (total / 100).toFixed(2)
})
const activeDistrict = computed(()=>{
  let {type} = state.district;
  return state.district[type]
})
onMounted(()=>{
  window.self === window.top ? location.href ='/' : SendMessage('ready',{msg:'youloge.shopcart is ready'});
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
  if(referrer.startsWith(origin) && method){
    let work = {
      'init':()=>{
        state.loading = false;
        state.host = new URL(origin).hostname;
        // Object.assign(state,data); mail money ukey notify
        console.log('params',params);
        ({
          uuid:state.uuid = null,
          mail:state.mail = '',
          ukey:state.ukey = '',
          notify:state.notify = '',
          close:state.close = false,
        } = params)
        params.ukey.length < 64 && SendMessage('error',{msg:'Ukey undefined'});
        onReady();
      }
    };
    work[method] ? work[method]() : console.log('not method');
  }
}

// 初始完成
const onReady = ()=>{
  state.loading = false;
  try{
    // 登录用户
    var account = JSON.parse(localStorage.getItem('account')) || [];
    // 共享地址
    var address = JSON.parse(localStorage.getItem('address')) || {};
  }catch(e){
    var account = [],address={};
  };
  console.log(address,account)
  state.profile = account.find(is=>is.mail == state.mail);
  Object.assign(state.shopping.address,address);
  console.log('youloge.payment onReady',state.profile);
  onSKUS()
}
// 获取SKU
const onSKUS = ()=>{
  let {uuid} = state;
  onFetch('goods','sku',{uuid:uuid}).then(data=>{
    Object.assign(state.skus,data);
    console.log(uuid,data)
  })
}
// 加载SKU 加载地址 加载商品
// 切换地址 - 条件：邮箱已登录
const onAddress = ()=>{
  onProvince();
  state.editor.show = true;
  // let {profile} = state
  // if(profile == undefined){
  //   console.log('未登录用户 请使用一次性地址')
  // }else{
  //   state.address.show = true;
  //   let {secret} = profile;
  //   onFetch('profile','address',{secret:secret}).then(res=>{
  //     state.address.list = res.data;
  //     console.log(res)
  //   })
  // }
  // console.log('youloge.payment onAddress',state.mail);
}
// 选中SKU
const onChecked = (item)=>{
  item.checked = true;
  item.quantity = 1
}
// 增减数量
const onQuantity = (item,flag)=>{
  if(flag && item.stock > item.quantity){
    item.quantity += 1;
  }
  if(!flag){
    item.quantity -= 1; 
    if(item.quantity < 1){
      item.checked = false;
    }
  }
}
// 合单下单
const onMerge = ()=>{
  let {uuid,mail,skus,shopping} = state;
  let filte = skus.filter(item=>item.checked);
  let address = shopping.address;
  if(address.tel == false){
    onAlert('请添加地址');
    return false
  }
  if(filte.length == 0){
    onAlert('请选择套餐');
    return false
  }
  onFetch('goods','checkout',{uuid:uuid,mail:mail,skus:filte,addres:address}).then(data=>{
    SendMessage('success',{msg:'合单下单',data:data})
  }).catch(msg=>onAlert(msg))
}
/**
 * 编辑收货地址
 */

/**
 * 1. 编辑器拉起选择器
 * 2. 传递数组['','','',''] 
 * 3. 初始化从头匹配 行政区换取UUID
 * 00.json 11/00.json 11/23.json 11/23/55.json
 */
// 选择行政区区划
const onProvince = (init = ['北京市'])=>{
  getFetch('https://open.youloge.com/district/00.json').then(res=>{
    let list = res.data.map(is=>{
      is.type = state.district.type;
      is.province = is.uuid
      return is
    })
    state.district.province = list
    console.log('youloge.payment onProvince',list);
  })
}
const district_head = (type)=>{
  state.district.type = type;
}
const district_select = (item)=>{
  let {head} = state.district
  let {uuid,type,province,city,county} = item;
  state.district.head[type] = item
  if(uuid == undefined){
    let addr = [head.province,head.city,head.county,head.street].filter(is=>is?.name).map(is=>is?.name)
    state.shopping.address.district = addr
    state.district.show = false
    console.log('youloge.payment district_select',addr,head,item);
    return addr
  }
  if(type == 'province'){
    getFetch(`https://open.youloge.com/district/${uuid}.json`).then(res=>{
      state.district.type = 'city'
      let list = res.data.map(is=>{
        is.type = state.district.type;
        is.province = uuid
        is.city = is.uuid;
        return is
      })
      state.district.city = list
      state.district.head.city = null
      state.district.head.county = null
      state.district.head.street = null
      console.log('youloge.payment onProvince',res);
    })
  } 
  if(type == 'city'){
    getFetch(`https://open.youloge.com/district/${province}/${uuid}.json`).then(res=>{
      state.district.type = 'county'
      let list = res.data.map(is=>{
        is.type = state.district.type;
        is.province = province
        is.city = city;
        is.county = is.uuid;
        return is
      })
      state.district.county = list
      state.district.head.county = null
      state.district.head.street = null
    })
  }
  if(type == 'county'){
    getFetch(`https://open.youloge.com/district/${province}/${city}/${uuid}.json`).then(res=>{
      state.district.type = 'street'
      let list = res.data.map(is=>{
        is.type = state.district.type;
        is.province = province
        is.city = city;
        is.county = county
        is.street = is.uuid;
        return is
      })
      state.district.street = list
      state.district.head.street = null
    })
  }
  console.log('youloge.payment district_select',item);
}
const editorSave = ()=>{
  localStorage.setItem('address',JSON.stringify(state.shopping.address));
  state.editor.show = state.shopping.address.district.length  > 0 ? false : true;
}
// 遮罩关闭
const onCloseAll = (e)=>{
  state.ref.contains(e.target) || state.close &&  SendMessage('error',{msg:'遮罩层关闭'});
}
// 弹窗消息
const onAlert = (msg)=>{
  alert(msg)
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
// 其他请求
const getFetch = (route)=>(state.loading = true,new Promise((resolve,reject)=>{
  fetch(route).then(r=>r.json()).then(res=>resolve(res)).catch(err=>{
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
const {ref,msg,host,code,mail,money,version,random,signer,skus,loading,deposit,shopping,address,editor,district} = toRefs(state)
</script>
<style lang="scss">
body{user-select: none;}
.layout{background: #fff;}
.grecaptcha-badge{visibility: hidden;}

.y-shopcart{
  user-select: none;
  .layout{
    margin: 5px;
    width: min(400px, 100vw);
    min-height: min(300px, 90%);
    box-shadow: 1px 1px 5px #999;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    .body{
      flex: auto;
    }
    .foot{

    }
  }
  .profile{
    position: relative;
    text-align: center;
    border-bottom: 1px solid #eee;
    padding: 5px;
  }
  .address{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    margin-bottom: 10px;
  }
  .skus{
    display: flex;
    flex-direction: column;
    // align-items: center;
    gap: 5px;
    max-height: 220px;
    overflow: hidden;
    overflow-y: auto;
    padding: 5px;
    // input::-webkit-outer-spin-button,
    // input::-webkit-inner-spin-button {
    //   -webkit-appearance: none;
    // }
    // input[type="number"] {
    //   -moz-appearance: textfield;
    // }
    .quantity{
      max-width: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      input{
        -moz-appearance: textfield;
        width: 100%;
        text-align: center;
        border: 0;
        outline: 0;
        text-decoration: 4px solid underline;
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
        }
      }
    }
    .unselect{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      gap: 10px;
      .item{
        color: #222;
        font-size: 14px;
        padding: 5px 4px;
        background: #eee;
        cursor: pointer;
      }
    }
    .selected{
      .item{
        border-bottom: 1px solid #eee;
      }
    }
   
  }
}
.y-address{
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
  user-select: none;
  flex-wrap: wrap;
  background: #fff;
  .layout{
    width: min(400px, 100vw);
    max-height: max(300px, 80%);
    box-shadow: 1px 1px 5px #999;
    background: #fff;
    // display: flex;
    // flex-direction: column;
    // justify-content: space-between;
    .head{
      height: 50px;
      border-bottom: 1px solid #f2f2f2;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      position: sticky;top: 0;
    }
  }
}
.y-editor{
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  z-index: 10;
  user-select: none;
  flex-wrap: wrap;
  background: #fff;
  .layout{
    width: min(400px, 100vw);
    max-height: max(300px, 80%);
    box-shadow: 1px 1px 5px #999;
    background: #fff;
    padding: 5px;
    .head{
      height: 50px;
      border-bottom: 1px solid #f2f2f2;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .boby{
      padding: 5px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      .item{
        display: flex;
        align-items: center;
        // height: 40px;
        >div{
          width: 80px;
          text-align: justify;
          height: 30px;
          line-height: 30px;
          margin-right: 10px;
          &::after{
            display: inline-block;
            width: 100%;
            content: '';
            vertical-align: middle;
          }
        }
        input,textarea{
          padding: 5px;
          flex: 1;  
          
        }
      }
    }
    .foot{
      text-align: center;
      margin: 10px auto;
      cursor: pointer;
      button{
        padding: 10px;
        width: 220px;
        border: 0;
        border-radius: 5px;
        background: #db4747;
        color: #fff;
      }
    }
  }
}
.y-district{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 12;
  backdrop-filter: blur(1px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #c7bebe38;
  .layout{
    width: min(400px, 100vw);
    height: 300px;
    box-shadow: 1px 1px 5px #999;
    background: #fff;
    overflow: hidden;
    .head{
      padding: 10px;
      display: flex;
      align-items: center;
      height: 45px;
      gap: 10px;
      border-bottom: 1px solid #f2f2f2;
      > div{
        cursor: pointer;
      }
    }
    .boby{
      display: flex;
      flex-direction: column;
      flex-wrap: initial;
      gap: 5px;
      padding: 10px;
      overflow: hidden;
      overflow-y: auto;
      height: 250px;
      > div{
        padding: 5px 0;
        border-bottom: 1px solid #f2f2f2;
        cursor: pointer;
      }
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