const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "one");
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "two");
});

const promise3 = Promise.resolve(3);

const promise4 = 42;

// Promise.race([promise1, promise2, promise3, promise4]).then((value) => {
//   console.log(value);
// });

function myPromiseRace(promises) {
  return new Promise((resolve, reject) => {
    if (!promises[Symbol.iterator]) {
      return reject(
        new TypeError(
          `${typeof promises} ${promises} is not iterable (cannot read property Symbol(Symbol.iterator))`
        )
      );
    }

    for (const p of promises) {
      Promise.resolve(p).then(resolve, reject);
    }
  });
}

Promise.myPromiseRace = myPromiseRace;

Promise.myPromiseRace([promise1, promise2, promise3, promise4]).then(
  (value) => {
    console.log(value);
  }
);
