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
          { text: '数据类型', link: '/interview/js/数据类型.md' },
          { text: '数据类型检测', link: '/interview/js/数据类型检测.md' },
          { text: '原型与原型链', link: '/interview/js/原型与原型链.md' },
          {
            text: '执行上下文、作用域、作用域链',
            link: '/interview/js/执行上下文、作用域和作用域链.md',
          },
          { text: '深拷贝', link: '/interview/js/深拷贝.md' },
          {
            text: '异步函数',
            items: [{ text: 'Promise', link: '/interview/js/Promise.md' }],
          },
          {
            text: 'File API',
            items: [
              { text: 'File和Blob', link: '/interview/js/File和Blob.md' },
            ],
          },
          {
            text: 'AJAX',
            link: '/interview/js/ajax.md',
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
          { text: 'deepClone', link: '/interview/write-code/deepClone.md' },
          { text: 'myPromise', link: '/interview/write-code/myPromise.md' },
        ],
      },
    ],
  },
}
