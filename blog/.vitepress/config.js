export default {
  // 站点级选项
  themeConfig: {
    // 主题级选项
    title: 'VitePress', // 站点标题
    description: 'Just playing around.',
    nav: [
      {
        text: '常见面试题',
        items: [
          { text: 'HTML', link: '/interview/html/' },
          { text: 'CSS', link: '/interview/css' },
          { text: 'JavaScript', link: '/interview/js' },
          { text: '🍣', link: '/interview/write-code' },
        ],
      },
    ],
    sidebar: [
      {
        text: 'HTML',
        link: '/interview/html/',
        items: [
          {
            text: 'meta 标签',
            link: '/interview/html/01.meta标签.md',
          },
          {
            text: 'img 标签',
            link: '/interview/html/02.img标签.md',
          },
          {
            text: 'video 标签',
            link: '/interview/html/03.video标签.md',
          },
          {
            text: 'DOM 文档对象模型',
            link: '/interview/html/DOM文档对象模型.md',
          },
          {
            text: 'BOM 文档对象模型',
            link: '/interview/html/BOM浏览器对象模型.md',
          },
          {
            text: '事件',
            link: '/interview/html/事件.md',
          },
          { text: 'html5', link: '/interview/html/html5.md' },
        ],
      },
      {
        text: 'CSS',
        link: '/interview/css/',
      },
      {
        text: 'JS',
        link: '/interview/js/',
        items: [
          { text: '数据类型', link: '/interview/js/01.数据类型.md' },
          {
            text: 'undefined VS null',
            link: '/interview/js/02.undefined VS null.md',
          },
          { text: '数据类型检测', link: '/interview/js/03.数据类型检测.md' },
          {
            text: 'new 操作符做了什么',
            link: '/interview/js/04.new操作符做了什么.md',
          },
          {
            text: 'call、apply、bind的区别',
            link: '/interview/js/05.call、apply、bind的区别.md',
          },
          { text: '原型与原型链', link: '/interview/js/06.原型与原型链.md' },
          { text: '闭包', link: '/interview/js/07.闭包.md' },
          {
            text: 'ES6',
            link: '/interview/js/ES6.md',
            items: [
              {
                text: '箭头函数 VS 普通函数',
                link: '/interview/js/es6/02.箭头函数 VS 普通函数.md',
              },
              {
                text: 'let、const、var之间的区别',
                link: '/interview/js/es6/03.let、const、var之间的区别.md',
              },
            ],
          },
          {
            text: '深入系列',
            items: [
              {
                text: '高阶函数',
                link: '/interview/js/深入系列/01.高阶函数.md',
              },
              {
                text: '事件循环',
                link: '/interview/js/深入系列/02.事件循环.md',
              },
              {
                text: '页面渲染',
                link: '/interview/js/深入系列/03.页面渲染.md',
              },
            ],
          },
          // {
          //   text: '执行上下文、作用域、作用域链',
          //   link: '/interview/js/执行上下文、作用域和作用域链.md',
          // },
          // { text: '深拷贝', link: '/interview/js/深拷贝.md' },
          // {
          //   text: '异步函数',
          //   items: [{ text: 'Promise', link: '/interview/js/Promise.md' }],
          // },
          // {
          //   text: 'File API',
          //   items: [
          //     { text: 'File和Blob', link: '/interview/js/File和Blob.md' },
          //   ],
          // },
          // { text: 'AJAX', link: '/interview/js/ajax.md' },
          // { text: '面向对象', link: '/interview/js/object-orientation.md' },
          // {
          //   text: 'Web API',
          //   items: [{ text: 'drag', link: '/interview/js/drag.md' }],
          // },
        ],
      },
      {
        text: 'Vue',
        link: '/interview/vue/01.mvvm设计模式与vue框架.md',
        items: [
          {
            text: 'vue-router',
            items: [
              {
                text: '路由模式',
                link: '/interview/vue/vue-router/01.路由模式.md',
              },
              {
                text: '导航守卫',
                link: '/interview/vue/vue-router/02.导航守卫.md',
              },
            ],
          },
          {
            text: '生命周期',
            link: '/interview/vue/02.生命周期.md',
          },
        ],
      },
      {
        text: 'node',
        items: [{ text: 'Stream 类', link: '/interview/node/stream.md' }],
      },
      {
        text: '🍣',
        link: '/interview/write-code',
        items: [
          { text: 'instanceof', link: '/interview/write-code/myInstanceof.md' },
          { text: 'new', link: '/interview/write-code/myNewFn.md' },
          { text: 'apply', link: '/interview/write-code/myApply.md' },
          { text: 'call', link: '/interview/write-code/myCall.md' },
          { text: 'deepClone', link: '/interview/write-code/deepClone.md' },
          { text: '防抖函数', link: '/interview/write-code/debounce.md' },
          { text: '日期格式化', link: '/interview/write-code/formatDate.md' },
          { text: '数组去重', link: '/interview/write-code/数组去重.md' },
        ],
      },
    ],
  },
}
