export default {
  // 站点级选项
  themeConfig: {
    // 主题级选项
    title: "VitePress", // 站点标题
    description: "Just playing around.",
    nav: [
      {
        text: "常见面试题",
        items: [
          { text: "HTML", link: "/interview/html/" },
          { text: "CSS", link: "/interview/css" },
          { text: "JavaScript", link: "/interview/js" },
          { text: "🍣", link: "/interview/write-code" },
        ],
      },
    ],
    sidebar: [
      {
        text: "HTML",
        link: "/interview/html/html.md",
        items: [
          { text: "meta 标签", link: "/interview/html/meta标签.md" },
          { text: "script 标签", link: "/interview/html/script标签.md" },
          { text: "link 标签", link: "/interview/html/link标签.md" },
          { text: "img 标签", link: "/interview/html/img标签.md" },
          { text: "video 标签", link: "/interview/html/video标签.md" },
        ],
      },
      {
        text: "CSS",
        link: "/interview/css/",
        items: [
          { text: "box-sizing 盒模型", link: "/interview/css/box-sizing.md" },
          { text: "BFC 块级格式化上下文", link: "/interview/css/BFC.md" },
          { text: "position 定位", link: "/interview/css/position.md" },
          { text: "transition 过渡", link: "/interview/css/transition.md" },
          { text: "animation 动画", link: "/interview/css/animation.md" },
          { text: "transform 变形", link: "/interview/css/transform.md" },
          {
            text: "media query 媒体查询",
            link: "/interview/css/media-query.md",
          },
          { text: "css单位", link: "/interview/css/css单位.md" },
          { text: "属性计算过程", link: "/interview/css/属性计算过程.md" },
          { text: "层叠继承规则", link: "/interview/css/层叠继承规则.md" },
        ],
      },
      {
        text: "JS",
        link: "/interview/js/",
        items: [
          { text: "let、const、var之间的区别", link: "/interview/js/let、const、var之间的区别.md" },
          { text: "箭头函数 VS 普通函数", link: "/interview/js/箭头函数 VS 普通函数.md" },
          { text: "数据类型", link: "/interview/js/数据类型.md" },
          { text: "数据类型检测", link: "/interview/js/数据类型检测.md" },
          { text: "数据类型转换", link: "/interview/js/数据类型转换.md" },
          { text: "new 操作符", link: "/interview/js/new操作符.md" },
          { text: "call、apply、bind", link: "/interview/js/call、apply、bind的区别.md" },
          { text: "this 指向", link: "/interview/js/this指向.md" },
          { text: "Promise", link: "/interview/js/Promise.md" },
          { text: "File API", link: "/interview/js/FileAPI.md" },
          { text: "原型、原型链", link: "/interview/js/原型与原型链.md" },
          { text: "执行上下文、执行栈", link: "/interview/js/执行上下文与执行栈.md" },
          { text: "作用域、作用域链", link: "/interview/js/作用域与作用域链.md" },
          { text: "高阶函数", link: "/interview/js/高阶函数.md" },
          { text: "闭包", link: "/interview/js/闭包.md" },
          { text: "DOM 文档对象模型", link: "/interview/js/DOM文档对象模型.md" },
          { text: "DOM 事件注册和移除", link: "/interview/js/DOM事件注册和移除.md" },
          { text: "DOM 事件传播机制", link: "/interview/js/DOM事件传播机制.md" },
          { text: "事件循环", link: "/interview/js/深入系列/事件循环.md" },
        ],
      },
      {
        text: "Vue系列",
        link: "/interview/vue/vue3新特性",
        items: [
          {
            text: "vue",
            items: [
              { text: "生命周期", link: "/interview/vue/生命周期.md" },
              { text: "组件通信方式", link: "/interview/vue/组件通信方式.md" },
              { text: "双向绑定", link: "/interview/vue/双向绑定.md" },
              { text: "响应式原理", link: "/interview/vue/响应式原理.md" },
              { text: "渲染机制", link: "/interview/vue/渲染机制.md" },
              { text: "diff算法", link: "/interview/vue/diff算法.md" },
              { text: "单向数据流", link: "/interview/vue/单向数据流.md" },
              { text: "修饰符", link: "/interview/vue/修饰符.md" },
              { text: "vif vs vshow", link: "/interview/vue/vif和vshow的区别" },
              { text: "为什么vue2中data属性是函数", link: "/interview/vue/为什么v2中data属性是一个函数" },
              { text: "nextTick", link: "/interview/vue/nextTick" },
              { text: "watch、watchEffect", link: "/interview/vue/watch、watchEffect" },
              { text: "ref、reactive", link: "/interview/vue/ref、reactive" },
            ],
          },
          {
            text: "vue-router",
            items: [
              { text: "路由模式", link: "/interview/vue/vue-router/路由模式.md" },
              { text: "导航守卫", link: "/interview/vue/vue-router/导航守卫.md" },
              { text: "动态路由", link: "/interview/vue/vue-router/动态路由.md" },
            ],
          },
        ],
      },
      {
        text: "node",
        items: [{ text: "Stream 类", link: "/interview/node/stream.md" }],
      },
      {
        text: "浏览器",
        items: [{ text: "渲染原理", link: "/interview/browser/渲染原理.md" }],
      },
      {
        text: "网络",
        items: [
          { text: "网络分层模型", link: "/interview/network/网络分层模型.md" },
          { text: "TCP、UDP", link: "/interview/network/TCP、UDP.md" },
          { text: "HTTP协议", link: "/interview/network/HTTP协议.md" },
          { text: "HTTP缓存协议", link: "/interview/network/HTTP缓存协议.md" },
          { text: "cookie", link: "/interview/network/cookie.md" },
          { text: "storage", link: "/interview/network/storage.md" },
          { text: "jwt", link: "/interview/network/jwt.md" },
          { text: "同源策略", link: "/interview/network/同源策略.md" },
          { text: "跨域-代理", link: "/interview/network/跨域-代理.md" },
          { text: "跨域-CORS", link: "/interview/network/跨域-CORS.md" },
          { text: "跨域-JSONP", link: "/interview/network/跨域-JSONP.md" },
          { text: "websocket", link: "/interview/network/websocket.md" },
        ],
      },
      {
        text: "🍣",
        link: "/interview/write-code",
        items: [
          { text: "instanceof", link: "/interview/write-code/myInstanceof.md" },
          { text: "new", link: "/interview/write-code/myNewFn.md" },
          { text: "apply", link: "/interview/write-code/myApply.md" },
          { text: "call", link: "/interview/write-code/myCall.md" },
          { text: "deepClone", link: "/interview/write-code/deepClone.md" },
          { text: "防抖函数", link: "/interview/write-code/debounce.md" },
          { text: "日期格式化", link: "/interview/write-code/formatDate.md" },
          { text: "数组去重", link: "/interview/write-code/数组去重.md" },
        ],
      },
      {
        text: "项目经验",
        items: [{ text: "投屏", link: "/interview/project-summary/投屏.md" }],
      },
      {
        text: "面试总结",
        items: [{ text: "大华", link: "/interview/experience/大华.md" }],
      },
    ],
  },
};
