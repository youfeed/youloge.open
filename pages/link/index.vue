<template>
  <transition name="fade">
    <main class="link" v-if="uuid">
      <div class="wrap"  ref="wrap">
        <div class="head">
          <h3>即将跳转到外部网站或APP</h3>
          <p>安全性未知，是否继续</p>
        </div>
        <div class="body">
          <div class="major">
            <div class="protocol" v-show="urls?.protocol" v-text="urls?.protocol" title="协议"></div>
            <div class="host" v-show="urls?.host" v-text="urls?.host" title="域名"></div>
            <div class="pathname" v-show="urls?.pathname" v-text="urls?.pathname" title="路径"></div>
          </div>
          <div class="minor">
            <div class="search" v-show="urls?.search" v-text="decodeURI(urls?.search)" title="参数"></div>
            <div class="hash" v-show="urls?.hash" v-text="decodeURI(urls?.hash)" title="锚点"></div>
          </div>
        </div>
        <div class="foot">
          <div class="spread">
            <a :href="`https://docs.youloge.com/spread?uuid=${author}`" v-show="uuid" target="_blank">广告推广</a>
          </div>
          <div class="close" v-show="urls == null" >
            外链不存在或以删除
          </div>
          <div class="redirect">
            <a :href="urls?.href" v-show="urls?.href">继续跳转</a>
          </div>
        </div>
        <div class="down" v-show="qrcode">
          <div>
            <img class="qrcode" :src="qrcode" alt="qr" @load="onLoad">
          </div>
          <div class="screen">
            <div class="shot" @click="screenShot">下载保存</div>
          </div>
        </div>
      </div>
      <!-- <svg height='100%' width='100%'><foreignObject x='0' y='0' height='100%' width='100%'></foreignObject></svg> -->
    </main>
  </transition>
</template>

<script setup>
import { onMounted, reactive,toRefs } from "vue";
const state = reactive({
  wrap:null,
  uuid:null,
  urls:{},
  qrcode:null,
  author:'',
  method:'',
  params:''
})
onMounted(()=>{
  let uuid = new URL(location).searchParams.get('target');
  let data = encodeURI(`https://open.youloge.com/link?target=${uuid}`)
  let qrcode = `https://qun.qq.com/qrcode/index?data=${data}&size=150`
  youloge.qrcode(qrcode).then(canvas=>{
    canvas.toBlob((blob)=>{
      var svgs = new Blob([blob], {type: "image/png;charset=utf-8"});
      var urls = URL.createObjectURL(svgs);
      state.qrcode = urls
      console.log(svgs)
    },"image/jpeg", 0.95)
  })

  fetch(`https://cdn.youloge.com/link/${uuid}`).then(r=>r.json()).then(({error,data})=>{
    if(error){
      state.urls = null;
      return false
    }
    Object.assign(state,data);state.uuid = uuid;onRefresh(data)
  }).catch(err=>{
    console.log(err)
  })
})
// 处理跳转(TODO:联盟请求)
const onRefresh = (data)=>{
  let {method,params} = data
  let action = {
    'redirect':()=>{
      state.urls = new URL(params);
    },'drive':()=>{
      location.href = `https://youloge.com/drive?f=${params}`;
    },'article':()=>{
      location.href = `https://youloge.com/article?s==${params}`;
    },'video':()=>{
      location.href = `https://youloge.com/video?v==${params}`;
    }
  };
  action[method] ? action[method]() : state.urls = null;
}
// 截屏下载
const screenShot = ()=>{
  let {wrap} = state;
  const copy = wrap.cloneNode(wrap);
  window.screenshot.toPng(wrap).then(function (dataUrl) {
      var img = new Image();
      img.src = dataUrl;
      img.onload = ()=>{
        document.body.appendChild(img);
      }
  }).catch(function (error) {
      console.error('oops, something went wrong!', error);
  });

  // const svg = document.createElement('svg');
  // svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  // svg.width = '100%';svg.height = '100%'
  // const foreignObject = document.createElement('foreignObject');
  // foreignObject.x = 0;foreignObject.y=0;foreignObject.width = '100%';foreignObject.height = '100%'
  // svg.appendChild(foreignObject);foreignObject.appendChild(copy);
  // document.body.appendChild(svg)
  // console.log(svg)
  // const string = new XMLSerializer().serializeToString(svg)
  // const xml=`<?xml version="1.0" standalone="no"?>\r\n${string}`;//生成xml文件
  // // const src=`data:image/svg+xml;chartset=utf-8,${encodeURIComponent(xml)}`;//生成src
  // const src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(xml))); //给图片对象写入base64编码的svg流
  // // const src=`data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(xml)))}`;
  // // var svgs = new Blob([string], {type: "image/svg+xml;charset=utf-8"});
  // // var urls = URL.createObjectURL(svgs);
  // const img=new Image();img.src=src;img.title="12"
  // document.body.appendChild(img);
  // var canvas = document.createElement('canvas');
  // document.body.appendChild(canvas);
  // img.onload = function () {
  //   var ctx = canvas.getContext('2d');
  //   ctx.drawImage(img, 0, 0);
  // };
}
const {wrap,uuid,urls,author,qrcode} = toRefs(state)
</script>

<style lang="scss">
*{padding: 0;margin: 0;}
html{background: #f2f2f2;}
svg,.link{
  // margin-top: 20%;
  margin: 10% 10px;
  .wrap{
    margin: 0 auto;
    max-width: 450px;
    background: #fff;
    padding: 5px;
    border-radius: 5px;
    box-shadow: 1px 1px 5px #ccc;
    .head{
      text-align: center;
    }
    .body{
      background: #f2f2f2;
      border-radius: 5px;
      padding: 20px 5px;
      margin: 10px 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
      .major,.minor{
        display: flex;
        align-items: start;
        flex-direction: column;
        justify-content: center;
        gap: 10px;
        overflow: hidden;
      }
      .protocol,.host,.pathname,.search,.hash{
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        border-radius: 10px;
        padding: 5px 10px;
        font-size: 14px;
        color: #0a0a0a;
        background: #6c7fe9;
        &::before{
          color: #fff;
          content: attr(title);
          padding-right: 5px;
          font-weight: 500;
        }
      }
    }
    .foot{
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 50px;
      .spread{
        a{
          font-size: 12px;
          text-decoration: none;
        }
      }
      .redirect{
        a{
          background: #1a73e8;
          border: 1px solid transparent;
          cursor: pointer;
          color: #fff;
          font-weight: 500;
          font-size: 14px;
          letter-spacing: .25px;
          line-height: 16px;
          margin-left: 10px;
          margin-right: 8px;
          min-width: 96px;
          padding: 9px 23px;
          text-align: center;
          vertical-align: middle;
          border-radius: 4px;
          box-sizing: border-box;
          text-decoration: none;
        }
      }
    }
    .down{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .qrcode{
        max-width: 120px;
      }
      .screen{
        .shot{
          background: #fff;
          border: 1px solid #1a73e8;
          cursor: pointer;
          color: #1a73e8;
          font-weight: 500;
          font-size: 14px;
          letter-spacing: .25px;
          line-height: 16px;
          margin-left: 10px;
          margin-right: 8px;
          min-width: 96px;
          padding: 9px 23px;
          text-align: center;
          vertical-align: middle;
          border-radius: 4px;
          box-sizing: border-box;
          text-decoration: none;
        }
      }
    }
  }
}
.fade-enter-active,.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,.fade-leave-to {
  opacity: 0;
}
</style>