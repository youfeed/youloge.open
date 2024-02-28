<template>
  <div class="y-video" ref="root">
    <div class="player" w-full h-full z--1>
      <video id="video" class="video" @canplay="canPlay" @timeupdate="timeupdate" :muted="muted" ref="ref" autoplay  playsinline webkit-playsinline x5-playsinline></video>
    </div>
    <div class="hover">
      <div class="start">
        <div class="rewind" @dblclick="onSeek" data-type="rewind">&#8810;</div>
        <div class="play" @click="onPlay">&#x25b6;</div>
        <div class="forward" @dblclick="onSeek" data-type="forward">&#8811;</div>
      </div>
      <div class="fullscreen" @click="onFullScreen">&#9974;</div>
      
      <div class="muted" @click="onMuted">&#9836;</div>
      <div class="setting">设置</div>
      <div>
        <input class="progress" type="range" min="0" max="100"  v-model="value" step="1" @click="onRange" @focus="onFocus" @blur="onBlur"/>
      </div>
      <div class="y-video__menu">
        <div class="y-video__controls">
  
        </div>
      </div>
    </div>
    <div v-if="poster" @click="onLoad" class="poster">
      <img  :src="poster" alt="">
    </div>
  </div>
</template>
<script setup>
import { computed, nextTick, onMounted, reactive, toRefs } from "vue";
const state = reactive({
  name:'youloge.video',
  version:'v0.0.1',
  hash:location.hash,
  referrer:document.referrer,
  uage:navigator.language.toLowerCase(),
  muted:false,
  root:null,
  ref:null,
  timer:null,
  playbackRate: [0.5, 0.75, 1, 1.5, 2],
  value:0,
  currentTime:0,
  duration:0,
  ranged:false,
  src:'',
  //
  uuid:null,
  ukey:null,
  poster:null,
  mp4:null,
  flv:null,
  dash:null,
  m3u8:null,
});
// unpkg.byted-static.com/xgplayer-flv/2.5.1/dist/index.min.js
// unpkg.byted-static.com/xgplayer-hls.js/2.2.2/browser/index.js
// unpkg.byted-static.com/xgplayer-shaka/1.1.5/browser/index.js
// https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/dashjs/4.3.0/dash.all.min.js
onMounted(()=>{
  window.self === window.top ? location.href ='/' : SendMessage('ready',{msg:'youloge.video is ready'});
  const {root,referrer,hash,ukey} = state;
  root.addEventListener('contextmenu',onContextmenu);
  window.addEventListener('message',({origin,data,source})=>{
    let {method,params} = data[hash] || {};
    let work = {
      'init':()=>{
        console.log(params);
        state.host = new URL(origin).hostname;
        ({
          close:state.close = false,
          ukey:state.ukey,
          uuid:state.uuid = null,
          poster:state.poster = null,
          mp4:state.mp4 = null,
          flv:state.flv = null,
          dash:state.dash = null,
          m3u8:state.m3u8 = null,
        } = params)
        params.ukey.length < 64 && SendMessage('error',{msg:'Ukey undefined'});
        onReady();
      }
    };
    work[method] ? work[method]() : console.log('not method');
  })
})
const onReady = ()=>{
  let {poster,uuid,mp4,m3u8,dash,flv} = state;
  const video = document.querySelector('#video');
  let action = {
    'uuid':()=>video.src = `https://cdn.youloge.com/${uuid}`,
    'mp4':()=>video.src = mp4,
    'm3u8':()=>{
      onScript('//cdn.jsdelivr.net/npm/shaka-player@4.5.0/dist/shaka-player.compiled.min.js').then((script)=>{
        shaka.polyfill.installAll();
        const player = new shaka.Player(video);
        window.player = player;
        player.load(m3u8);
      });
    },
    'dash':()=>{
      onScript('//cdn.jsdelivr.net/npm/shaka-player@4.5.0/dist/shaka-player.compiled.min.js').then((script)=>{
        shaka.polyfill.installAll();
        const player = new shaka.Player(video);
        window.player = player;
        console.log(player,shaka)
        player.load(dash);
      });
    }
  }
  action[uuid && 'uuid' || mp4 && 'mp4' || m3u8 && 'm3u8' || dash && 'dash' || flv && 'flv']();
}
// 异步脚本
const onScript = (url)=>{
  return new Promise((resolve,reject)=>{
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onload = ()=>{
      console.log('onReady');
      resolve(script)
    }
    document.body.appendChild(script);
  })
}
// 加载完毕
const canPlay = ()=>{
  let {ref} = state;
  ref.play();
  console.log('canPlay');
}
// 海报播放
const onLoad = ()=>{
  let {ref} = state;
  state.poster = null;ref.play();
}
// 点击播放
const onPlay = ()=>{
  let {ref} = state;
  ref.paused ? ref.play() : ref.pause();
}
// 快进快退
const onSeek = (e)=>{
  let {type} = e.target.dataset;let {ref,timer} = state;
  if(type == 'rewind'){
    ref.currentTime -= 10;
  }else{
    ref.currentTime += 10;
  }
  console.log(type)
}
// 
const onFocus = ()=>state.ranged = true;
const onBlur = ()=>state.ranged = false;
// 静音切换
const onMuted = ()=>{
  state.muted = !state.muted;
  console.log('muted',ref.muted,state.muted)
  // ref.muted = ref.muted ? false : true;
}
// 
const timeupdate = (e)=>{
  let {ranged,ref:{currentTime,duration}} = state;
  console.log(currentTime,duration)
  ranged == false && (state.value = (currentTime / duration * 100) >> 0)
}
// 全屏
const onFullScreen = ()=>{
  let {root} = state;
  document.fullscreenElement ? document.exitFullscreen() :  root.requestFullscreen()
}
// 右键监听
const onContextmenu = (e)=>{
  e.preventDefault();e.stopPropagation();
  console.log(e);
}
// 进度条
const onRange = (e)=>{
  nextTick(()=>{
    let {value,ref} = state;
    ref.currentTime = ref.duration / 100 * value;ref.blur();
    console.log('onRange',value,e)
  })
}
// SendMessage
const SendMessage = (method,params={})=>{
  let {hash,referrer} = state;
  referrer && window.parent.postMessage({ [hash]:{method:method,params:params} }, referrer);
}
const {ref,src,muted,value,poster,root} = toRefs(state);
</script>

<style lang="scss">
*{margin: 0;padding: 0;}
html{width: 100%;height: 100%;user-select: none;}
.hover{
  visibility: hidden;
}
.y-video{
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  &:hover .hover{
    animation: .3s;
    visibility: visible;
  }
  .player{
    width: 100%;
    height: 100%;
    video{
      height: 100%;
    width: 100%;
    }
  }
  .start{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    // justify-content: space-between;
    .forward,.play,.rewind{
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 50px;
      color: #eee;
      font-weight: bold;
      height: 50%;
    }
  }
  .muted,.fullscreen{
    position: absolute;
    // background: #efefef30;
    font-size: 60px;
    display: inline-block;
    padding: 0 20px;
    cursor: pointer;
    color: #fff;
  }
  .muted{
    left: 2%;
    top: 2%;
  }
  .fullscreen{
    right: 2%;
    top: 2%;
  }
  .progress{
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    margin: 0 10px;
    -webkit-appearance: none;
    appearance: none;
    outline: 0;
    background-color: transparent;
    cursor: pointer;
    &::-webkit-slider-runnable-track {
      height: 4px;
      background: #eee;
    }
    &::-webkit-slider-container {
      height: 20px;
      overflow: hidden;
    }
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #f11607;
        border: 1px solid transparent;
        margin-top: -8px;
        border-image: linear-gradient(#dd1d10,#ee1505) 0 fill / 8 20 8 0 / 0px 0px 0 2000px;
    }
  }
  .poster{
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    &:before{
      content: "▶";
      position: absolute;
      color: #fff;
      font-size: 80px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>