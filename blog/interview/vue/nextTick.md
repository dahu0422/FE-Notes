# nextTick()

等待下一次 DOM 更新刷新的工具方法

```js
function nextTick(callback?: () => void): Promise<void>
```

当你在 Vue 中更改响应式状态时，最终的 DOM 更新并不是同步生效的，而是由 Vue 将它们缓存在一个队列中，直到下一个“tick”才一起执行。这样

nextTick() 可以在状态改变后立即使用，以等待 DOM 更新完成。你可以传递一个回调函数作为参数，或者 await 返回的 Promise。

```js
<script setup>
import { ref, nextTick } from 'vue'

const count = ref(0)

async function increment() {
  count.value++

  // DOM 还未更新
  console.log(document.getElementById('counter').textContent) // 0

  await nextTick()
  // DOM 此时已经更新
  console.log(document.getElementById('counter').textContent) // 1
}
</script>

<template>
  <button id="counter" @click="increment">{{ count }}</button>
</template>
```

开发中使用场景:

- 响应式数据变化后获取 DOM 状态
- 在 created 钩子中获取 DOM 状态

从源码层面来说，nextTick 之所以能让我们访问到 DOM 更新之后的结果，是因为我们添加的回调函数会被加到队列刷新函数（flushSchedulerQueue）的后面。这样等到队列内部更新函数都执行完毕后，所有 DOM 操作也就结束了，callback 自然能获取到 dom 的值。

内部是通过 `Promise.then` 的方式加入队列的

源码地址: `/packages/runtime-core/src/scheduler.ts#L204`
