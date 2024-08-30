# ref 和 reactive

## ref

vue3 中使用 `ref()` 声明响应式状态。`ref()` 接收参数，并将其**包裹**在一个带有 `.value` 属性的 **ref 对象**中返回：

```js
const count = ref(0);

console.log(count); // { value: 0 }
console.log(count.value); // 0

count.value++;
console.log(count.value); // 1
```

当在模板中使用时，ref 会自动解包。

```html
<button @click="count++">{{ count }}</button>
```

## reactive

reactive() 使对象本身具有响应式，返回的是一个原始对象的 Proxy，他和原始对象不相等.

```js
const raw = {};
const proxy = reactive(raw);

// 代理对象和原始对象不是全等的
console.log(proxy === raw); // false
```

reactive() API 的局限性：

- 只能用于对象类型，不能用于原始类型。
- 不能替换整个对象，因为 Vue 的响应式跟踪是通过属性访问实现的，所以要始终保持对响应式对象有相同的引用。

  ```js
  let state = reactive({ count: 0 });

  // 上面的 ({ count: 0 }) 引用将不再被追踪
  // (响应性连接已丢失！)
  state = reactive({ count: 1 });
  ```

- 对解构操作不友好，当我们将响应式对象的原始类型属性解构为本地变量时，或者将该属性传递给函数时，我们将丢失响应性连接：

  ```js
  const state = reactive({ count: 0 });

  // 当解构时，count 已经与 state.count 断开连接
  let { count } = state;
  // 不会影响原始的 state
  count++;

  // 该函数接收到的是一个普通的数字
  // 并且无法追踪 state.count 的变化
  // 我们必须传入整个对象以保持响应性
  callSomeFunction(state.count);
  ```
