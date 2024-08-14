# myPromiseAll

Promise.all() 方法接收一个 Promise 的 iterable 类型（注：Array，Map，Set 都属于 ES6 的 iterable 类型）的输入，并且只返回一个 Promise。

只有当参数中的所有 promise 都“完成”时，才返回的这个 promise 才“完成”。

如果参数 promise 中有一个失败（rejected），此 promise 就会失败（rejected），参数中第一个失败的 promise 的返回值，会传递给失败的回调函数。

示例：

```javascript
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});
// Expected output: Array [3, 42, "foo"]
```

手写：

```javascript
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
});
// const promise4 = Promise.reject("err");

function myPromiseAll(promises) {
  debugger;
  return new Promise((resolve, reject) => {
    // 判断是否可迭代
    if (!promises[Symbol.iterator]) {
      reject(
        new TypeError(
          `${typeof promises} ${promises} is not iterable (cannot read property Symbol(Symbol.iterator))`
        )
      );
    }

    let count = 0;
    let fulfilledCount = 0;
    const res = [];

    for (const p of promises) {
      const index = count++;
      Promise.resolve(p).then((data) => {
        res[index] = data;
        fulfilledCount++;
        if (fulfilledCount === count) {
          resolve(res);
        }
      }, reject);
    }

    if (count === 0) {
      resolve(res);
    }
  });
}

Promise.myPromiseAll = myPromiseAll;

Promise.myPromiseAll([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});
```
