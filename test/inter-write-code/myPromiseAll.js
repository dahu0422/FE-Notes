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
