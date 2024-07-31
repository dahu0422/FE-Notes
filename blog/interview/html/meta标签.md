# meta 标签
meta 标签用于定义页面的元信息（如标题、关键词、描述等），这些信息不会显示在页面上，但可以供搜索引擎、浏览器、其他程序使用。

常用的属性有：
- charset：指定**字符集编码**，告知浏览器如何解析页面内容；
- name：指定元信息名称：
  - description：页面的**描述**，常用与**搜索引擎的摘要显示**；
  - keywords：页面的关键词；
  - author：页面的作者；
  - viewport：**设置视口**，用于控制页面的显示宽度和缩放比例；
  - copyright：页面的**版权信息**；
  - robots：指定搜索引擎是否可以抓取页面内容；
  - ...
- http-equiv：指定HTTP头部信息，提供一些与HTTP头部类似的元信息
  - Expires：指定页面的过期时间，一旦页面过期，浏览器必须从服务器获取新的内容； 
  - Pragma：指定页面是否缓存，例如 `pragma:no-cache` 告知浏览器不要从本地缓存中调用页面内容。在页面调试阶段可以确保总是获取最新的内容。
  - Cache-Conrol：控制缓存行为，例如 `Cache-Control:no-cache` 告知浏览器不要缓存页面内容。
  - refresh：指定页面的刷新时间，例如 `refresh:300` 表示每 300 秒刷新一次页面。
  - ...


### 字符集声明
```html
<meta charset="UTF-8">
```

### 视口设置
视口设置：控制页面的显示宽度和缩放比例：
- width=device-width 设置页面宽度等于设备宽度；
- initial-scale 设置初始缩放比例；
- maximum-scale=1.0 设置最大缩放比例；
- minimum-scale=1.0 设置最小缩放比例；
- user-scalable=no 禁止用户手动缩放页面；
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### 搜索引擎优化
提供页面的描述和关键词，用于搜索引擎优化（SEO）
```html
<meta name="description" content="Page description">
```
### 指定页面作者
```html
<meta name="author" content="Author Name">
```

### 定时刷新页面
```html
<meta http-equiv="refresh" content="300">
````
