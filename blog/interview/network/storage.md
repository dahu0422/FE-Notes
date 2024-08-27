# storage 

## sessionStorage 会话存储
生命周期：数据存储在 sessionStorage 中，只要浏览器的窗口或标签页是打开的，数据就一直存在。当用户关闭了包含数据的窗口或标签页时，sessionStorage 中的数据会被清除。

作用域：sessionStorage 的数据只对创建它的窗口或标签页可见。即使在同一浏览器中，不同的窗口或标签页也无法访问彼此的 sessionStorage 数据，除非它们通过 postMessage 进行通信。

用途：通常用于存储与用户会话相关的信息，如表单数据或用户的临时偏好设置，这些信息在用户离开页面后不需要保留。

## localStorage 本地存储
生命周期：localStorage 中的数据具有持久性，即使浏览器关闭或重启，数据仍然存在，直到明确地被清除或用户清理浏览器缓存为止。

作用域：localStorage 的数据在整个原域内共享，即所有来自同一原域的窗口和标签页都可以访问相同的 localStorage 数据。

用途：适合存储长期的数据，如用户配置选项、应用状态或缓存数据，这些数据在用户多次访问网站时仍需保持不变。

## cookie/sessionStorage/localStorage 的区别
> 参考答案：
>
> cookie、sessionStorage、localStorage 都是保存本地数据的方式
>
> 其中，cookie 兼容性较好，所有浏览器均支持。浏览器针对 cookie 会有一些默认行为，比如当响应头中出现`set-cookie`字段时，浏览器会自动保存 cookie 的值；再比如，浏览器发送请求时，会附带匹配的 cookie 到请求头中。这些默认行为，使得 cookie 长期以来担任着维持登录状态的责任。与此同时，也正是因为浏览器的默认行为，给了恶意攻击者可乘之机，CSRF 攻击就是一个典型的利用 cookie 的攻击方式。虽然 cookie 不断的改进，但前端仍然需要另一种更加安全的保存数据的方式
>

> HTML5 新增了 sessionStorage 和 localStorage，前者用于保存会话级别的数据，后者用于更持久的保存数据。浏览器针对它们没有任何默认行为，这样一来，就把保存数据、读取数据的工作交给了前端开发者，这就让恶意攻击者难以针对登录状态进行攻击。
> cookie 的大小是有限制的，一般浏览器会限制同一个域下的 cookie 总量为 4M，而 sessionStorage 和 localStorage 则没有限制
> cookie 会与 domain、path 关联，而 sessionStorage 和 localStorage 只与 domain 关联

