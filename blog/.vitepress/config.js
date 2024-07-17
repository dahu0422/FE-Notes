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
          { text: 'html5', link: '/interview/html/html5.md' },
          { text: '响应式设计', link: '/interview/html/响应式设计.md' },
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
          {
            text: 'ES6',
            link: '/interview/js/ES6.md',
            items: [
              {
                text: '箭头函数 VS 普通函数',
                link: '/interview/js/es6/02.箭头函数 VS 普通函数.md',
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
        items: [{ text: '响应式原理', link: '/interview/vue/响应式原理.md' }],
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
          { text: 'deepClone', link: '/interview/write-code/deepClone.md' },
          // { text: 'myPromise', link: '/interview/write-code/myPromise.md' },
          { text: '防抖函数', link: '/interview/write-code/debounce.md' },
          { text: '日期格式化', link: '/interview/write-code/formatDate.md' },
          { text: '数组去重', link: '/interview/write-code/数组去重.md' },
        ],
      },
    ],
  },
}
