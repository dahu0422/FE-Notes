# Promise

`Promise`对象表示异步操作最终的结果。

`Promise`的三种状态：
- `Pending` 待定：初始状态，既没有被兑现，也没有被拒绝。
- `Fulfilled` 已实现：表示异步操作已成功完成。当 Promise 对象被解析（resolved）时，状态变为 `Fulfilled`，并传递一个值给它的 .then() 链中的成功回调函数。
- `Rejected` 已拒绝：表示异步操作失败。当 Promise 对象被拒绝（rejected）时，状态变为 `Rejected`，并传递一个原因（错误或失败的原因）给它的 .catch() 方法或 .then() 链中的失败回调函数。
  
`Promise` 的状态只能从 `Pending` 变为 `Fulfilled` 或 `Rejected`，并且一旦状态改变，就不会再变回到 `Pending` 或另一种结果状态。

## Promise() 构造函数
`Promise()` 构造函数用于创建一个新的 `Promise` 对象。传递一个执行器函数（executor function）给 `Promise` 构造函数，这个函数接受两个函数参数：`resolve` 和 `reject`。
- `resolve` 函数用于在异步操作成功完成时调用，并将异步操作的结果传递给 `Promise` 的 `.then()` 方法。
- `reject` 函数用于在异步操作失败时调用，并将错误传递给 `Promise` 的 `.catch()` 方法。
```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 3000)
})

promise.then((val) => { console.log(val) }) // success
console.log(promise) // [object Promise]
```
`reslove(value)`方法的参数可以是另一个`Promise`对象，这种情况下，新`Promise`的状态取决于`value`的`Promise`状态。
```javascript
const promiseParam = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('fail'))
  }, 1000)
})

// 该promise状态为rejected，由promiseParam决定
const promise = new Promise((resolve, reject) => {
  resolve(promiseParam)
})

const c = promise.then(
  (data) => { console.log(data) },
  (reason) => { console.log(reason) }
)
```

## Promise的链式调用
`Promise`的链式调用主要依赖于`.then()`和`.catch()`方法，这些方法会返回新的`Promise`对象，因此可以链式组合多个异步操作。

`promise.then(onFulfilled, onRejected)`方法接收两个参数，`onFulfilled`当Promise操作成功时异步执行的函数，`onRejected`当Promise操作失败时异步执行的函数。

返回一个新的`Promise`对象，其(称为p)行为取决于处理函数执行的结果遵循以下规则：
- 返回一个值，p以该值作为兑现值
- 没有任何返回值，p以`undefined`作为兑现值
- 抛出错误，p以抛出的错误作为拒绝值(rejected)
- 返回一个已兑现的Promise对象，p以该Promise的值作为兑现值
- 返回一个已拒绝的Promise对象，p以该Promise的值作为拒绝值
- 返回一个待定的Promise对象，p保持待定状态，在该Promise对象被兑现或拒绝后立即以Promise的值作为其兑现/拒绝值
  
## Promise读代码题
```javascript
```