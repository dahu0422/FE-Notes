# async await

`async function` 声明创建一个 `AsyncFunction` 对象。每次调用异步函数时都会返回一个新的 `Promise` 对象，该对象将会被解决为异步函数的返回值，或者被拒绝为异步函数中未捕获的异常。

`async function` 总会返回一个 `Promise`。如果一个异步函数的返回值看起来不是 promise，那么它将会被隐式地包装在一个 promise 中。

```js
async function f() {
  return 1;
}

f().then((v) => console.log(v)); // 1

// 类似于
async function f() {
  return Promise.resolve(1);
}
```

`async function` 中可以包含 0 个或多个 `await` 表达式。

`await` 表达式通过暂停执行使返回 promise 的函数表现得像同步函数一样，直到返回的 promise 被兑现或拒绝

```js
function resolveFunc() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2);
    }, 1000);
  });
}

async function asyncCall() {
  const res = await resolveFunc();
  console.log(res);
}

asyncCall();

console.log(1);

// -------- 1, 2 --------
```

使用 async/await 关键字就可以使用普通的 try/catch 代码块捕获异步代码中的错误。

如果在 async 函数中抛出了错误，则终止错误结果，不会继续向下执行。

```js
async function async1() {
  await async2();

  console.log("async1");

  return "async1 success";
}

async function async2() {
  return new Promise((resolve, reject) => {
    console.log("async2");
    reject("error");
  });
}

async1().then((res) => console.log(res));

// async2
// Uncaught (in promise) error
```

如果想要使得错误的地方不影响 `async` 函数后续的执行的话，可以使用 `try catch`

```js
async function async1() {
  try {
    await Promise.reject("error!!!");
  } catch (e) {
    console.log(e);
  }
  console.log("async1");
  return Promise.resolve("async1 success");
}
async1().then((res) => console.log(res));
console.log("script start");
```

---

每个 await 表达式之后的代码可以被认为存在于 `.then` 回调中。

`await` 总会同步地对表达式求值并处理，处理行为与 `Promise.resolve` 一致，不属于原生 Promise 的值全都会被隐式地转换为 Promise 实例后等待。处理的规则为，若表达式：

- 是一个原生 Promise（原生 Promise 的实例或其派生类的实例，且满足 expression.constructor === Promise），会被直接用于等待，等待由原生代码实现，该对象的 then() 不会被调用。
- 是 thenable 对象（包括非原生的 Promise 实例、polyfill、Proxy、派生类等），会构造一个新 Promise 用于等待，构造时会调用该对象的 then() 方法。
- 不是 thenable 对象，会被包装进一个已兑现的 Promise 用于等待，其结果就是表达式的值。
