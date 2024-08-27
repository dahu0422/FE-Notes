# watch vs watchEffect

## watch

侦听一个或多个响应式数据源，并在数据源变化时调用回调函数。

watch 接受三个参数：响应式数据源、回调函数、配置项。返回停止侦听的方法

```js
// 侦听单个来源
function watch<T>(
  source: WatchSource<T>,
  callback: WatchCallback<T>,
  options?: WatchOptions
): StopHandle

// 侦听多个来源
function watch<T>(
  sources: WatchSource<T>[],
  callback: WatchCallback<T[]>,
  options?: WatchOptions
): StopHandle
```

在状态变化时执行一些“副作用”：例如更改 DOM，或是根据异步操作的结果去修改另一处的状态。

## watchEffect

立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行。

```js
function watchEffect(
  effect: (onCleanup: OnCleanup) => void,
  options?: WatchEffectOptions
): StopHandle
```

## watch vs watchEffect

- `watch` 只追踪明确侦听的数据源。它不会追踪任何在回调中访问到的东西。另外，仅在数据源确实改变时才会触发回调。watch 会避免在发生副作用时追踪依赖，因此，我们能更加精确地控制回调函数的触发时机。

- `watchEffect` 是一种特殊的 `watch`，在副作用发生期间追踪依赖。它会在同步执行过程中，自动追踪所有能访问到的响应式属性。这更方便，而且代码往往更简洁，但有时其响应性依赖关系会不那么明确。

```js
const todoId = ref(1);
const data = ref(null);

// watch 写法
watch(
  todoId,
  async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId.value}`);
    data.value = await response.json();
  },
  { immediate: true }
);

// 等价于 watchEffect
watchEffect(async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId.value}`);
  data.value = await response.json();
});
```

watchEffect 在使用时传入的函数会立即执行一次。`watch` 默认情况下不会执行回调函数，可以手动设置 `immediate` 选项。
