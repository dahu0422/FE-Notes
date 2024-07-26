# URLSearchParams 
URLSearchParams对象是浏览器的原生对象，用来构造、解析和处理 URL 的**查询字符串**（即 URL 问号后面的部分）。

它本身也是一个构造函数，可以生成实例。参数可以为查询字符串，起首的问号 `?` 有没有都行，也可以是对应查询字符串的数组或对象。
```js
// 方法一：传入字符串
const params = new URLSearchParams('?foo=1&bar=2');
// 等同于
const params = new URLSearchParams(document.location.search);

// 方法二：传入数组
const params = new URLSearchParams([['foo', 1], ['bar', 2]]);

// 方法三：传入对象
const params = new URLSearchParams({'foo' : 1 , 'bar' : 2});
```

`URLSearchParams` 会对查询字符串自动编码
```js
const params = new URLSearchParams({'foo': '你好'});
params.toString() // "foo=%E4%BD%A0%E5%A5%BD"
```

浏览器向服务器发送表单数据时，可以直接使用 `URLSearchParams`实例作为表单数据。
```js
const params = new URLSearchParams({foo: 1, bar: 2});
fetch('https://example.com/api', {
  method: 'POST',
  body: params
}).then(...)
```

`URLSearchParams` 实例有遍历器接口，可以用 `for...of` 循环遍历
```js
var params = new URLSearchParams({'foo': 1 , 'bar': 2});
for (var p of params) {
  console.log(p[0] + ': ' + p[1]);
}
// foo: 1
// bar: 2
```