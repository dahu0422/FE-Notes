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
        ],
      },
    ],
    sidebar: [
      {
        text: 'HTML',
        link: '/interview/html/',
        items: [{ text: 'html5', link: '/interview/html/html5.md' }],
      },
      {
        text: 'CSS',
        link: '/interview/css/',
      },
      {
        text: 'JS',
        link: '/interview/js/',
        items: [
          { text: 'JavaScript数据类型', link: '/interview/js/数据类型.md' },
        ],
      },
    ],
  },
}
