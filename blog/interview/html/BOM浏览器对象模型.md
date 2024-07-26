# BOM 浏览器对象模型
BOM(Browser Object Model)是浏览器提供的一个对象模型，用于操作浏览器窗口。BOM由浏览器窗口对象(window)、文档对象(document)、事件对象(event)组成。

## window 对象
window 对象是 BOM的 核心对象，window 对象在浏览器中有两重身份：
- ECMAScript 的 Global 对象全局对象；
- 浏览器窗口的 JavaScript接口；

页面中定义的所有对象、变量、函数都以 window 作为其 Global 对象。

## location 对象
location 对象用于获取**浏览器的地址栏信息**，有如下属性：
- href：浏览器的地址栏**信息**；
- protocol：浏览器的地址栏**协议**；
- host：浏览器的地址栏**主机**；
- pathname：浏览器的地址栏**路径**；
- search：浏览器的地址栏**参数**；
- hash：浏览器的地址栏**哈希**；
```javascript
// 以 https://cn.bing.com/search?q=baidu&PC=U316&FORM=CHROMN 

const url = window.location.href; 
// https://cn.bing.com/search?q=baidu&PC=U316&FORM=CHROMN

const protocol = window.location.protocol; 
// https:

const host = window.location.host; 
// cn.bing.com

const pathname = window.location.pathname; 
// /search

const search = window.location.search; 
// ?q=baidu&PC=U316&FORM=CHROMN


const hash = window.location.hash; 
// #
```

## history 对象
history 对象用于**管理浏览器的历史记录**，history 对象有如下方法：
- length：返回历史记录的个数；
- back()：返回上一页；
- forward()：前进一页；
- go(n)：跳转到指定页面；
- pushState(state, title, url)：在历史记录中添加一个新记录；
- replaceState(state, title, url)：替换当前记录；

popState 事件：每当同一个文档的浏览历史（即history对象）出现变化时，就会触发popstate事件。
```js
window.addEventListener('popstate', function(event) {
  console.log('location: ' + document.location);
  console.log('state: ' + JSON.stringify(event.state));
});
```
注意：调用 `pushState()` 方法或 `replaceState()` 方法 ，并不会触发该事件。只有用户点击浏览器倒退按钮和前进按钮，或者使用 JavaScript 调用 `History.back()`、`History.forward()`、`History.go()` 方法时才会触发。

## navigator 对象
navigator 对象提供了**有关浏览器的信息**，可用于获取用户代理的详细信息，navigator 对象常用属性：
- appCodeName：浏览器的代码名称；
- appName：浏览器的名称；
- appVersion：浏览器的版本；
- cookieEnabled：浏览器是否启用 Cookie；
- userAgent：浏览器的用户代理字符串；
- clipboard：剪贴板对象；
- plugins：浏览器插件列表；
- ...

