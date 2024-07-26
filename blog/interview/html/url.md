# URL
## URL 的编码与解码
网页的 URL 只能包含合法的字符。合法字符分成两类。
- **URL 元字符**：分号（`;`）、逗号（`,`）、斜杠（`/`）、问号（`?`）、冒号（`:`）、at（`@`）、&、等号（`=`）、加号（`+`）、美元符号（`$`）、井号（`#`）
- **语义字符**：`a-z` 、`A-Z` 、`0-9`、连词号（`-`）、下划线（`_`）、点（`.`）、感叹号（`!`）、波浪线（`~`）、星号（`*`）、单引号（`'`）、圆括号（`()`）

除了以上字符，其他字符出现在 URL 之中都必须转义，规则是根据操作系统的默认编码，将**每个字节转为百分号（%）加上两个大写的十六进制字母**。

比如 `http://www.example.com/q=春节` 这个 URL 之中，汉字“春节”不是 URL 的合法字符，所以被浏览器自动转成 `http://www.example.com/q=%E6%98%A5%E8%8A%82` 。其中，“春”转成了 `%E6%98%A5`，“节”转成了 `%E8%8A%82` 。这是因为“春”和“节”的 UTF-8 编码分别是E6 98 A5和E8 8A 82，将每个字节前面加上百分号，就构成了 URL 编码。

JavaScript 提供四个 URL 的编码/解码方法。
- `encodeURI()`
- `encodeURIComponent()`
- `decodeURI()`
- `decodeURIComponent()`

### encodeURI()
`encodeURI()` 方法用于转码整个 URL。它的参数是一个字符串，代表整个 URL。它会将元字符和语义字符之外的字符，都进行转义。

```js
encodeURI('http://www.example.com/q=春节')
// "http://www.example.com/q=%E6%98%A5%E8%8A%82"
```

### encodeURIComponent()
`encodeURIComponent()` 方法用于转码 URL 的组成部分，会转码除了语义字符之外的所有字符，即元字符也会被转码。所以不能用于转码整个 URL。它接受一个参数，就是 URL 的片段。
```js
encodeURIComponent('春节')
// "%E6%98%A5%E8%8A%82"

encodeURIComponent('http://www.example.com/q=春节')
// "http%3A%2F%2Fwww.example.com%2Fq%3D%E6%98%A5%E8%8A%82"
```

### decodeURI()
`decodeURI()` 方法用于整个 URL 的解码。它是 `encodeURI()` 方法的逆运算。它接受一个参数，就是转码后的 URL。

```js
decodeURI('http://www.example.com/q=%E6%98%A5%E8%8A%82')
// "http://www.example.com/q=春节"
```

### decodeURIComponent()
`decodeURIComponent()` 用于URL 片段的解码。它是 `encodeURIComponent()` 方法的逆运算。它接受一个参数，就是转码后的 URL 片段。
```js
decodeURIComponent('%E6%98%A5%E8%8A%82')
// "春节"
```

## URL 接口
### 构造函数
`URL` 接口是一个构造函数，浏览器原生提供，可以用来构造、解析和编码 URL。一般情况下，通过 `window.URL` 可以拿到这个构造函数。
```js
const url = new URL('http://www.example.com/index.html');
url.href // "http://www.example.com/index.html"
```

如果参数是另一个 **URL 实例**，构造函数会自动读取该实例的 href 属性，作为实际参数。如果 URL 字符串是一个**相对路径**，那么需要表示绝对路径的第二个参数，作为计算基准。
```js
var url1 = new URL('index.html', 'http://example.com');
url1.href
// "http://example.com/index.html"

var url2 = new URL('page2.html', url1);
url2.href
// "http://example.com/page2.html"

var url3 = new URL('..', 'http://example.com/a/b.html')
url3.href
// "http://example.com/"
```

### URL 实例属性 与 静态方法
实例属性参照 Location 接口。

### URL.createObjectURL()
`URL.createObjectURL()` 方法用来为上传/下载的文件、流媒体文件生成一个 URL 字符串。这个字符串代表了 File 对象或 Blob 对象的 URL。
```js
const inp = document.querySelector('input[type=file]');
const img = document.querySelector('img');
window.addEventListener('change', function() {
  const file = inp.files[0];
  img.src = window.URL.createObjectURL(file);
})
```
上面代码中，`URL.createObjectURL()` 方法用来为上传的文件生成一个 URL 字符串，作为 `<img>` 元素的图片来源。该方法生成的 URL `blob:http://localhost/c745ef73-ece9-46da-8f66-ebes574789b1`

### URL.revokeObjectURL()
`URL.revokeObjectURL()` 方法用来释放 `URL.createObjectURL()` 方法生成的 URL 实例。它的参数就是 `URL.createObjectURL()` 方法返回的 URL 字符串。
```js
const inp = document.querySelector('input[type=file]');
const img = document.querySelector('img');
window.addEventListener('change', function() {
  const file = inp.files[0];
  img.src = window.URL.createObjectURL(file);
  img.onload = function() {
    window.URL.revokeObjectURL(img.src);
  }
})
```
上面代码中，一旦图片加载成功以后，为本地文件生成的 URL 字符串就没用了，于是可以在img.onload回调函数里面，通过URL.revokeObjectURL()方法卸载这个 URL 实例。



[参考链接](https://www.bookstack.cn/read/javascript-tutorial/docs-bom-location.md#a7uypd)