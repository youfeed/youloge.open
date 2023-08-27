<template>
  <div class="layout">
    <header></header>
    <main>
      <article>
        <div><img src="/icon.svg" class="icon"></div>
        <h1>Youloge.open</h1>
        <p class="title">嵌入式小组件</p>
        <p class="version">v{{version}}</p>
        <div class="actions">
          <div class="action"><a href="https://youfeed.github.io/open/">开始使用</a></div>
          <div class="action"><a href="https://github.com/youfeed/youloge.open/">查看源码</a></div>
        </div>
      </article>
    </main>
    <footer>©2023 皖ICP备 19004549号 皖公安备案：34112402000344</footer>
  </div>
</template>

<script setup>
import { version } from '/package.json'
</script>

<style lang="scss">
*{box-sizing: border-box;margin: 0;padding: 0;}
.layout{
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  header{height: 60px;}
  main{flex: auto;}
  article{
    height: 100%;
    width: 100%;
    text-align: center;
    h1{
      background:-webkit-linear-gradient( 120deg, #bd34fe 30%, #41d1ff );
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .title{
      letter-spacing: 4px;
      line-height: 40px;
      font-size: 32px;
      font-weight: 700;
    }
    .version{
      font-size: 14px;
      font-weight: 700;
      padding: 4px 6px;
      margin-left: 6px;
      background: #646cff;
      color: #fff;
      border-radius: 10px;
      vertical-align: middle;
      display: inline;
    }
    .actions{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      margin-top: 50px;
    }
    .action{
      border-radius: 20px;
      padding: 0 20px;
      line-height: 38px;
      font-size: 14px;
      border-color:#747bff;
      background: #646cff;
      a{
        cursor: pointer;
        text-decoration: none;
        color:#fff;
      }
    }
    .icon{
      max-width: 220px;opacity: 0.8;
    }
  }
  footer{height: 30px;text-align: center;font-size: 12px;color: #999;}
}
</style>