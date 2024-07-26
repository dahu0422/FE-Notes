# link 标签
`<link>` 标签是 HTML 中用于**定义文档与外部资源之间**关系的一种方式。是**自闭合**的，不需要结束标签。

常用属性有：
- rel：指定链接的类型，常见的值有：stylesheet、icon、preload；
- href：指定链接的资源路径；
- as：指定链接的资源类型，常见的值有：script、style、font、image；
- media：指定链接的媒体类型，常见的值有：screen、print；

### 链接外部样式表
```html
<link href="xxx.css" rel="stylesheet" />
```

### 链接图标
```html
<link rel="icon" type="image/png" href="favicon.png">
```

### 预加载
`<link rel="preload">` 是 HTML 中用于优化**资源加载策略**的标签。用于告知浏览器**优先**加载某个资源，即使该资源在当前页面未立即用到。尤其是在首屏渲染时间优化方面，可以减少白屏时间。
```html
<link rel="preload" href="styles.css" as="style">
```

### 使用媒体查询条件性加载资源
`<link>` 标签的 media 属性可以结合媒体查询，只有满足媒体查询条件时才加载资源。
```html
<!-- 打印加载 -->
<link href="print.css" rel="stylesheet" media="print" />
<link href="mobile.css" rel="stylesheet" media="all" />
<link
  href="desktop.css"
  rel="stylesheet"
  media="screen and (min-width: 600px)" />
```