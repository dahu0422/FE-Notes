export default {
  // 站点级选项
  themeConfig: {
    // 主题级选项
    title: "VitePress", // 站点标题
    description: "Just playing around.",

    sidebar: [
      {
        text: "HTML",
        link: "/blog/html/html.md",
        items: [
          { text: "meta 标签", link: "/blog/html/meta标签.md" },
          { text: "script 标签", link: "/blog/html/script标签.md" },
          { text: "link 标签", link: "/blog/html/link标签.md" },
          { text: "img 标签", link: "/blog/html/img标签.md" },
          { text: "video 标签", link: "/blog/html/video标签.md" },
        ],
      },
      {
        text: "CSS",
        link: "/blog/css/",
        items: [
          { text: "box-sizing 盒模型", link: "/blog/css/box-sizing.md" },
          { text: "BFC 块级格式化上下文", link: "/blog/css/BFC.md" },
          { text: "position 定位", link: "/blog/css/position.md" },
          { text: "transition 过渡", link: "/blog/css/transition.md" },
          { text: "animation 动画", link: "/blog/css/animation.md" },
          { text: "transform 变形", link: "/blog/css/transform.md" },
          {
            text: "media query 媒体查询",
            link: "/blog/css/media-query.md",
          },
          { text: "css单位", link: "/blog/css/css单位.md" },
          { text: "属性计算过程", link: "/blog/css/属性计算过程.md" },
          { text: "层叠继承规则", link: "/blog/css/层叠继承规则.md" },
        ],
      },
      {
        text: "JS",
        link: "/blog/js/",
        items: [
          { text: "let、const、var之间的区别", link: "/blog/js/let、const、var之间的区别.md" },
          { text: "箭头函数 VS 普通函数", link: "/blog/js/箭头函数 VS 普通函数.md" },
          { text: "数据类型", link: "/blog/js/数据类型.md" },
          { text: "数据类型检测", link: "/blog/js/数据类型检测.md" },
          { text: "数据类型转换", link: "/blog/js/数据类型转换.md" },
          { text: "new 操作符", link: "/blog/js/new操作符.md" },
          { text: "call、apply、bind", link: "/blog/js/call、apply、bind的区别.md" },
          { text: "this 指向", link: "/blog/js/this指向.md" },
          { text: "Promise", link: "/blog/js/Promise.md" },
          { text: "File API", link: "/blog/js/FileAPI.md" },
          { text: "原型、原型链", link: "/blog/js/原型与原型链.md" },
          { text: "执行上下文、执行栈", link: "/blog/js/执行上下文与执行栈.md" },
          { text: "作用域、作用域链", link: "/blog/js/作用域与作用域链.md" },
          { text: "DOM 文档对象模型", link: "/blog/js/DOM文档对象模型.md" },
          { text: "DOM 事件注册和移除", link: "/blog/js/DOM事件注册和移除.md" },
          { text: "DOM 事件传播机制", link: "/blog/js/DOM事件传播机制.md" },
          { text: "事件循环", link: "/blog/js/事件循环.md" },
          {
            text: "函数式编程",
            items: [
              { text: "高阶函数", link: "/blog/js/高阶函数.md" },
              { text: "防抖与节流", link: "blog/js/防抖和节流.md" },
            ],
          },
        ],
      },
      {
        text: "Vue系列",
        link: "/blog/vue/vue3新特性",
        items: [
          {
            text: "vue",
            items: [
              { text: "生命周期", link: "/blog/vue/生命周期.md" },
              { text: "组件通信方式", link: "/blog/vue/组件通信方式.md" },
              { text: "双向绑定", link: "/blog/vue/双向绑定.md" },
              { text: "响应式原理", link: "/blog/vue/响应式原理.md" },
              { text: "渲染机制", link: "/blog/vue/渲染机制.md" },
              { text: "diff算法", link: "/blog/vue/diff算法.md" },
              { text: "单向数据流", link: "/blog/vue/单向数据流.md" },
              { text: "修饰符", link: "/blog/vue/修饰符.md" },
              { text: "vif vs vshow", link: "/blog/vue/vif和vshow的区别" },
              { text: "为什么vue2中data属性是函数", link: "/blog/vue/为什么v2中data属性是一个函数" },
              { text: "nextTick", link: "/blog/vue/nextTick" },
              { text: "watch、watchEffect", link: "/blog/vue/watch、watchEffect" },
              { text: "ref、reactive", link: "/blog/vue/ref、reactive" },
            ],
          },
          {
            text: "vue-router",
            items: [
              { text: "路由模式", link: "/blog/vue/vue-router/路由模式.md" },
              { text: "导航守卫", link: "/blog/vue/vue-router/导航守卫.md" },
              { text: "动态路由", link: "/blog/vue/vue-router/动态路由.md" },
            ],
          },
        ],
      },
      {
        text: "前端工程化",
        items: [{ text: "webpack、vite", link: "/blog/engineering/webpack、vite.md" }],
      },
      {
        text: "浏览器",
        items: [{ text: "渲染原理", link: "/blog/browser/渲染原理.md" }],
      },
      {
        text: "网络",
        items: [
          { text: "网络分层模型", link: "/blog/network/网络分层模型.md" },
          { text: "TCP、UDP", link: "/blog/network/TCP、UDP.md" },
          { text: "HTTP协议", link: "/blog/network/HTTP协议.md" },
          { text: "HTTP缓存协议", link: "/blog/network/HTTP缓存协议.md" },
          { text: "cookie", link: "/blog/network/cookie.md" },
          { text: "storage", link: "/blog/network/storage.md" },
          { text: "jwt", link: "/blog/network/jwt.md" },
          { text: "同源策略", link: "/blog/network/同源策略.md" },
          { text: "跨域-代理", link: "/blog/network/跨域-代理.md" },
          { text: "跨域-CORS", link: "/blog/network/跨域-CORS.md" },
          { text: "跨域-JSONP", link: "/blog/network/跨域-JSONP.md" },
          { text: "websocket", link: "/blog/network/websocket.md" },
        ],
      },
      {
        text: "node",
        items: [{ text: "Stream 类", link: "/blog/node/stream.md" }],
      },
      {
        text: "🍣",
        link: "/blog/write-code",
        items: [
          { text: "instanceof", link: "/blog/write-code/myInstanceof.md" },
          { text: "new", link: "/blog/write-code/myNewFn.md" },
          { text: "apply", link: "/blog/write-code/myApply.md" },
          { text: "call", link: "/blog/write-code/myCall.md" },
          { text: "deepClone", link: "/blog/write-code/deepClone.md" },
          { text: "防抖函数", link: "/blog/write-code/debounce.md" },
          { text: "日期格式化", link: "/blog/write-code/formatDate.md" },
          { text: "数组去重", link: "/blog/write-code/数组去重.md" },
        ],
      },
      {
        text: "项目经验",
        items: [{ text: "投屏", link: "/blog/project-summary/投屏.md" }],
      },
      {
        text: "面试总结",
        items: [{ text: "大华", link: "/blog/experience/大华.md" }],
      },
    ],
  },
};
