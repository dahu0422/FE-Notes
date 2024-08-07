# 小程序开发

## 目录介绍

小程序主体部分由三个文件组成：

- app.js 小程序逻辑，入口文件
- app.json 小程序公共配置
- app.wxss 小程序公共样式表

小程序页面有四部分文件组成：

- .js 页面逻辑
- .wxml 页面结构
- .json 页面配置
- .wxss 页面样式表

## [全剧配置 app.json](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html)
重点介绍一下 `app.json` 文件

`app.json` 文件用来对微信小程序进行全局配置，决定页面文件的路径、窗口表现、设置网络超时时间、设置多tab等。

### [默认启动路径 entryPagePath](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#entryPagePath)
指定小程序的默认启动路径（首页），常见情景是从微信聊天列表页下拉启动、小程序列表启动等。如果不填，将默认为 pages 列表的第一项。不支持带页面路径参数。


### [页面路径 pages](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#pages)

`pages` 用于指定小程序由哪些页面组成，每一项对应一个页面的路径（包含文件名）信息。

**小程序中新增/减少页面，直接对 `pages` 数组进行操作就可以。**

### [全局窗口默认表现 window](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#pages)

用于设置小程序的状态栏、导航条、标题、窗口背景颜色

![window](https://res.wx.qq.com/wxdoc/dist/assets/img/config.344358b1.jpg)

### [底部 tab 栏表现](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#tabBar)

如果小程序是一个多 tab 应用（客户端底部或顶部有 tab 栏可以切换页面），可以通过 tabBar 配置项指定 tab 的表现，以及 tab 切换时显示的页面。

示例如下：

```json
"tabBar": {
  "list": [{
    "pagePath": "pages/index/index",
    "iconPath": "static/images/featured.png",
    "selectedIconPath": "static/images/featured-actived.png",
    "text": "首页"
  }, {
    "pagePath": "pages/logs/logs",
    "iconPath": "static/images/profile.png",
    "selectedIconPath": "static/images/profile-actived.png",
    "text": "日志"
  }]
},
```

- pagePath：页面路径，必须在 `pages` 中先定义
- text：tab 上按钮文字
- iconPath：图片路径
- selectedIconPath：选中时图片路径

![tabbar](https://res.wx.qq.com/wxdoc/dist/assets/img/tabbar.ce1b3c5b.png)


## 生命周期

小程序中的生命周期分为：小程序生命周期 和 页面生命周期

### 小程序生命周期

小程序生命周期在 `app.js` 中注册

- onLaunch：监听小程序初始化
- onShow：监听小程序启动或切前台
- onHide：监听小程序切后台

```js
// app.js
App({
  onLaunch (options) {
    // Do something initial when launch.
  },
  onShow (options) {
    // Do something when show.
  },
  onHide () {
    // Do something when hide.
  },
  globalData: 'I am global data'
})
```

### 页面生命周期

- onLoad：监听页面加载，一个页面只会触发一次
- onReady：监听页面首次渲染完成，一个页面只会触发一次。代表页面准备妥当，可以和视图层进行交互。(先于 onshow 触发)
- onShow：监听页面显示/切入前台时触发
- onHide：监听页面隐藏/切换后台时触发
- onUnlod：监听页面卸载

## [云 API](https://developers.weixin.qq.com/miniprogram/dev/api/)

微信小程序云 API 是微信官方提供的一种云端服务接口，这些 API 包括存储用户、网络等等。

具体用到具体查找即可

- wx.getSetting：获取用户的当前设置，返回值中之后出现小程序已经向用户请求过的权限
- wx.getUserInfo：获取用户信息
- wx.setStorage(key, value)：将数据存储在本地缓存中指定 key 中，会覆盖原有 key 对应的内容
- wx.getStorage(key, value)：从本地缓存中异步获取指定 key 的内容


## [wxml](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/)

wxml（WeiXin Markup Language）是框架设计的一套标签语言，结合基础组件、事件系统可以构建出页面的结构。

相当于小程序中的模板引擎

### `<block>` 标签
小程序中的 `<block>` 标签不是一个组件，只是一个包装元素，不会在页面中生成任何实际的 DOM 节点。因此不接受任何样式的设置。

作用类似于 Vue 中的 `<template>` 标签，主要用途：

1. 逻辑分组
2. 条件渲染：结合 `wx:if`、`wx:elif`、`wx:else` 等条件渲染指令，`<block>` 可以实现复杂的条件判断逻辑。
3. 列表渲染：通过 `wx:for` 指令，`<block>` 包裹一个列表项，并对列表中的每一项进行渲染。



