# Youloge.OPEN [内嵌组件源代码](https://github.com/youfeed/youloge.open/)

### 该项目下站点页面只能<font color=#FF000 >iframe</font>方式引入，这是个通用组件

目前组件有：
- open.youloge.com/sso 单点登录
- open.youloge.com/gift 礼品
- open.youloge.com/pay 支付
- open.youloge.com/payment 订单
- open.youloge.com/ad 广告

可以使用的网址有以下：如果想帮你的网址服务也加入进来请在`issue`提交

- https://open.youloge.com/ 托管于`七牛云`存储
- https://i.open.youloge.com/ 托管于`Github Pages`存储
- https://c.open.youloge.com/ 托管于`Cloudflare Pages`存储

### 开始使用:
下载项目
```
git pull https://github.com/youfeed/youloge.open
```
初始化
```
npm i
```
运行
```
npm run dev
npm run build
npm run preview
```

项目使用`vite` 仅依赖`vue` 构建十分简单

