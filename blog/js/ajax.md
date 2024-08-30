# AJAX
AJAX（Asynchronous JavaScript And XML ）是一种在 Web 应用中通过异步发送 HTTP 请求向服务器获取内容，并使用这些新内容更新页面中相关的部分，而无需重新加载整个页面的 Web 开发技术。

有两种实现AJAX方式：`XMLHttpRequest` 和 `fetch()`

## XMLHttpRequest
XMLHttpRequest（简称 XHR）是 AJAX 的基础，是浏览器提供的一个对象，用于在后台与服务器交换数据。

### 基本使用
创建一个XMLHttpRequest 对象，向xxx服务器发送请求，并监听请求完成事件。
```javascript
const xhr = new XMLHttpRequest()
xhr.timeout = 2000
xhr.open('GET', 'http://localhost:3000/text.txt')
xhr.addEventListener('load', () => {
  console.log('请求完成，返回内容为': xhr.responseText);
})
xhr.send()
```
属性：
- `xhr.timeout`：请求超时时间，默认为0，表示不超时。
- `xhr.responseText`：响应文本，请求完成前值为空。

方法：
  - `xhr.open(method, url, async)`：初始化请求，`method`：请求方式，`url`：请求地址，`async`：是否异步，默认为true。
  - `xhr.send(data)`：发送请求，`data`：请求参数，默认为null。

事件：
  - `load`：请求完成时触发。
  
###  请求状态 与 响应状态
属性：
- `xhr.readyState`：**请求状态**
  - UNSENT 0：未初始化，代理已创建，未调用`open()`方法。
  - OPENED 1：已打开，`open()`方法已经被调用。
  - HEADERS_RECEIVED 2：已发送，`send()`方法已经调用，并且头部和状态已被认可。
  - LOADING 3：请求中，部分响应体正在被接收。
  - DONE 4：请求完成。
- `xhr.status`：响应状态码，请求完成前值为0。
- `xhr.statusText`：响应状态文本，请求完成前值为空。
  
事件：
- `xhr.readyStateChange`：只要`readyState`改变，就会触发。


```javascript
const xhr = new XMLHttpRequest()
console.log('UNSEND', `请求状态${xhr.readyState}`, `响应状态${xhr.status}`)
xhr.addEventListener('readystatechange', () => {
  console.log('onreadystatechange', `请求状态${xhr.readyState}`, `响应状态${xhr.status}`)
})
xhr.open('GET', 'http://localhost:3000/text.txt')
xhr.send()
```

### 文件下载
事件：
- `xhr.progress`：当从**服务器接收数据时触发**。会在服务器响应数据的过程中多次触发，每次都会携带一部分接收到的数据的信息。通常用于下载操作

TODO

### XMLHttpRequestUpload 
`upload` 是 `XMLHttpRequest` 对象的一个属性，它提供了一组事件用来**监听文件上传**：
  - onloadstart：请求开始时触发。
  - onprogress：数据传输中。
  - onload：请求成功。
  - onabort：请求被中断。
  - onerror：请求失败。
  - ontimeout：请求超时。
  - onloadend：请求完成（无论成功失败）。

最常用的场景就是在文件上传中使用：
```javascript
// 创建表单
const file = new File(["foo"], "foo.txt", {
  type: "text/plain",
});
const form = new FormData()
form.append('file', file)

// 发送请求
const xhr = new XMLHttpRequest()
xhr.open('POST', 'http://localhost:3000/upload/')
xhr.upload.addEventListener('progress', (e) => {
  const percent = Math.floor(e.loaded / e.total * 100)
  console.log(percent);
})
xhr.send(form)
```

## fetch
`fetch`是基于`Promise`的HTTP请求API，提供了一种更简洁、更灵活的方式处理网络请求。

### 基本使用
`fetch(url[, options])`：接收一个URL，返回一个Promise对象，会兑现为请求响应`Response`对象。
```javascript
fetch('http://localhost:3000/text.txt')
  .then(response => response.json())
  .then(data => console.log(data))
```

## 参考
[MDN-使用XMLHttpRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest_API/Using_XMLHttpRequest)  
[MDN-XMLHttpRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)  
[MDN-XMLHttpRequestUpload](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequestUpload) 