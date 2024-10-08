# meta 标签

meta 标签用于定义页面的元信息（如标题、关键词、描述等），这些信息不会显示在页面上，但可以供搜索引擎、浏览器、其他程序使用。

## charset

指定**字符集编码**，告知浏览器如何解析页面内容。

该属性声明了文档的字符编码。如果存在该属性，则其值必须是字符串 `utf-8` 的不区分 ASCII 大小写的匹配，因为 UTF-8 是 HTML5 文档的唯一有效编码。声明字符编码的 `<meta>` 元素必须完全位于文档的前 1024 个字节内。

```html
<meta charset="UTF-8" />
```

[HTML UTF-8 参考手册](https://www.runoob.com/charsets/ref-html-utf8.html)

Unicode 联盟（Unicode Consortium）开发了 Unicode 标准（Unicode Standard）。他们的目标是使用标准的 Unicode 转换格式（即 UTF，全称 Unicode Transformation Format）取代现有的字符集。

UTF8 中的字符可以是 1 到 4 字节长。UTF-8 可以代表 Unicode 标准中的任何字符。UTF-8 向后兼容 ASCII。UTF-8 是电子邮件和网页的首选编码。

## name

指定元信息名称: viewport、description、author...

### 视口设置 viewport

控制页面的显示宽度和缩放比例：

- width=device-width 设置页面宽度等于设备宽度；
- initial-scale 设置初始缩放比例；
- maximum-scale=1.0 设置最大缩放比例；
- minimum-scale=1.0 设置最小缩放比例；
- user-scalable=no 禁止用户手动缩放页面；

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

### 搜索引擎优化 description

提供页面的描述和关键词，用于搜索引擎优化（SEO）

```html
<meta name="description" content="Page description" />
```

### 指定页面作者 author

```html
<meta name="author" content="Author Name" />
```

### 定时刷新页面

```html
<meta http-equiv="refresh" content="300" />
```

- copyright：页面的**版权信息**；
- http-equiv：指定 HTTP 头部信息，提供一些与 HTTP 头部类似的元信息
  - Expires：指定页面的过期时间，一旦页面过期，浏览器必须从服务器获取新的内容；
  - Pragma：指定页面是否缓存，例如 `pragma:no-cache` 告知浏览器不要从本地缓存中调用页面内容。在页面调试阶段可以确保总是获取最新的内容。
  - Cache-Conrol：控制缓存行为，例如 `Cache-Control:no-cache` 告知浏览器不要缓存页面内容。
  - refresh：指定页面的刷新时间，例如 `refresh:300` 表示每 300 秒刷新一次页面。
