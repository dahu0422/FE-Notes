// Promise.any() 静态方法将一个 Promise 可迭代对象作为输入，并返回一个 Promise。当输入的任何一个 Promise 兑现时，这个返回的 Promise 将会兑现，并返回第一个兑现的值。当所有输入 Promise 都被拒绝（包括传递了空的可迭代对象）时，它会以一个包含拒绝原因数组的 AggregateError 拒绝。

const promise1 = Promise.reject(0);
const promise2 = new Promise((resolve) => setTimeout(resolve, 100, "quick"));
const promise3 = new Promise((resolve) => setTimeout(resolve, 500, "slow"));

const promises = [promise1, promise2, promise3];

// 原版
// Promise.any(promises).then((value) => console.log(value));

// 手写
function myPromiseAny(promises) {
  return new Promise((resolve, reject) => {
    if (!promises[Symbol.iterator]) {
      return reject(
        new TypeError(
          `${typeof promises} ${promises} is not iterable (cannot read property Symbol(Symbol.iterator))`
        )
      );
    }
    let count = 0;
    let errorRes = [];
    for (const p of promises) {
      Promise.resolve(p).then(resolve, (err) => {
        errorRes.push(err);
        count++;
        if (count === promises.length) {
          reject(new AggregateError(errorRes, "All promises were rejected"));
        }
      });
    }
  });
}

Promise.myPromiseAny = myPromiseAny;

Promise.myPromiseAny(promises).then((value) => console.log(value));
