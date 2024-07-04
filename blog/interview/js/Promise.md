# Promise
`Promise`对象表示异步操作最终的结果。

`Promise`有三种状态：
- `Pending` 待定：初始状态，既没有被兑现，也没有被拒绝。
- `Fulfilled` 已实现：表示异步操作成功。
- `Rejected` 已拒绝：表示异步操作失败。
  
`Promise` 的状态只能从 `Pending` 变为 `Fulfilled` 或 `Rejected`，并且一旦状态改变，就不会再变回到 `Pending` 或另一种结果状态。

## Promise构造函数
`Promise`构造函数接受一个函数`executor`作为参数，该函数接收两个**函数参数**`resolve` 和 `reject`：
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

`reslove`方法的`value`参数可以是另一个`Promise`对象，这种情况下，新构造`Promise`的状态取决于`value`传入的`Promise`状态。
```javascript
const promiseParam = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('fail')
  }, 1000)
})

// 该promise状态为rejected，由promiseParam决定
const promise = new Promise((resolve, reject) => {
  resolve(promiseParam)
})
console.log(promise) // Promise {<rejected>: 'fail'}
```

## Promise的链式调用
`promise.then()`方法接收两个参数 `onFulfilled` 和 `onRejected`：
- `onFulfilled`：当`promise`操作成功时执行`onFulfilled`。如果不是函数，返回接收到的成功值。
- `onRejected`：当`promise`操作失败时执行`onRejected`。如不是函数，返回接收到拒绝原因。

```javascript
const p = Promise.resolve().then()
```
`promise.then`方法执行后返回一个新的`promise`实例对象(称为p)，`p`的状态依赖于`.then`方法回调函数的处理结果，大致分为以下原则：
- 返回一个值，p以该值作为兑现值
- 没有任何返回值，p以`undefined`作为兑现值
- 抛出错误，p以抛出的错误作为拒绝值(rejected)
- 返回一个已兑现的Promise对象，p以该Promise的值作为兑现值
- 返回一个已拒绝的Promise对象，p以该Promise的值作为拒绝值
- 返回一个待定的Promise对象，p保持待定状态，在该Promise对象被兑现或拒绝后立即以Promise的值作为其兑现/拒绝值

这个判断规则是MDN上写的，起初看到我都懵了，始终搞不清`p`的状态。仔细琢磨之后理清了，请看以下示例，判断`promise2`的状态!!

示例1：很基本
```javascript
const promise1 = new Promise((resolve, reject) => {
  resolve('success')
  // reject('fail')
})
const promise2 = promise1.then(
  (val) => {
    console.log(val, 'success') // success success
  },
  (reason) => {
    console.log(reason, 'fail') // fail fail
  }
)

console.log(promise2) // Promise {<fulfilled>: 'success'} ｜ Promise {<rejected>: 'fail'}
```

示例2：`promise1`返回一个已兑现的Promise对象
```javascript
const promise1 = new Promise((resolve, reject) => {
  resolve(Promise.resolve('success'))
})
const promise2 = promise1.then(
  (val) => {
    console.log(val, 'success') // success success
  },
  (reason) => {
    console.log(reason, 'fail')
  }
)
console.log(promise1, promise2) // Promise {<fulfilled>: Promise} Promise {<fulfilled>: 'success'}
```

示例3：`promise1`返回一个已拒绝的`promise`对象，这个示例就挺难懂的了
```javascript
const promise1 = new Promise((resolve, reject) => {
  resolve(Promise.reject('fail'))
})
const promise2 = promise1.then(
  (val) => {
    console.log(val, 'success')
  },
  (reason) => {
    console.log(reason, 'fail') // fail fail
  }
)
console.log(promise1, promise2) // Promise {<rejected>: 'fail'} Promise {<fulfilled>: Promise} 
```
1. `promise1`虽然调用的`resolve`方法，但是参数传递的是一个`promise`对象，`promise1`状态取决于参数状态，所以为`rejected`以拒绝；
2. `promise1`状态为`rejected`，所以`promise1.then`执行失败回调，而失败回调并没有返回任何内容，所以`promise2`状态为`fulfilled`，以`undefined`作为兑现值；

示例4：在示例3的基础之上，在`promise2`执行失败回调时，返回一个`promise`对象。
```javascript
const promise1 = new Promise((resolve, reject) => {
  resolve(Promise.reject('fail'))
})
const promise2 = promise1.then(
  (val) => {
    console.log(val, 'success')
  },
  (reason) => {
    console.log(reason, 'fail') // fail fail
    return Promise.resolve('success')
  }
)
console.log(promise1, promise2) // Promise {<rejected>: 'fail'} Promise {<fulfilled>: 'success'}
```
根据上边规则，在失败回调当中返回了一个已兑现的`promise`对象，所以`promise2`状态为`fulfilled`，以`'success'`作为兑现值。
## Promise的执行顺序
**当初始化`promise`实例后，主体代码是同步开始执行，`promise.then`的回调函数是异步执行的，因为需要等待`promise`实例的状态改变。**

示例1
```javascript
const promise = new Promise((resolve, reject) => {
  // 这里是 Promise 主体，执行异步任务
  console.log(1)
  ajax('xxx', () => {
    resolve('成功了')
  })
}).then(() => {
  console.log(2)
})
console.log(3) // 最终输出 1、3、2
```

示例2
```javascript
const promise = new Promise((resolve, reject) => {
  // 主体只有同步代码，则 Promise 状态会立马标注为成功
  console.log(1)
  resolve()
}).then(() => {
  console.log(2)
})
console.log(3) // 最终输出为 1、3、2
```
## 使用Promise封装异步任务
在处理和封装异步任务时有两个关键点：
1. **定义异步任务的执行执行内容**，例如发送ajax请求、读取文件、设置定时器等；
2. **指出异步任务结束的时机**，例如请求返回时机、读取文件结束时机、定时器结束时机等；

```javascript
function getData() {
  const promise = new Promise((resolve, reject) => {
    ajax('xxx', (data) => {
      resolve(data)
    })
  })
  return promise
}

getData().then(data => {
  console.log(data)
})
```
