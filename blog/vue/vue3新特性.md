# [Vue3 中值得关注的新特性](https://v3-migration.vuejs.org/zh/)

## Composition API

组合式 API 是一系列 API 的集合，是我们可以使用函数而不是声明选项的方式书写 Vue 组件。它是一个概括性的术语，涵盖了以下方面的 API：

- 响应式 API：例如 `ref` 和 `reactive`，使我们可以直接创建响应式状态、计算属性和侦听器。
- 生命周期钩子：例如 `onMounted` 和 `onUnmounted`，使我们可以在组件各个生命周期阶段添加逻辑。
- 依赖注入：例如 `provide` 和 `inject`，使我们可以在使用响应式 API 时，利用 Vue 的依赖注入系统。

```vue
<script setup>
import { ref, onMounted } from 'vue'

// 响应式状态
const count = ref(0)

// 更改状态、触发更新的函数
function increment() {
  count.value++
}

// 生命周期钩子
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>

```

组合式 API 并不是函数式编程。组合式 API 是以 Vue 中数据可变的、细粒度的响应性系统为基础的，而函数式编程强调数据不可变。

组合式 API 的优势在于更好的逻辑复用，它是我们能够通过[组合函数](https://cn.vuejs.org/guide/reusability/composables.html)来实现更简洁高效的逻辑服复用。

### 组合函数

在 Vue 应用的概念中，“组合式函数”是一个利用 Vue 组合式 API 来封装和复用**有状态逻辑**的函数。

有状态逻辑负责管理会随时间而变化的状态。一个简单的例子是跟踪当前鼠标在页面中的位置。

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const x = ref(0)
const y = ref(0)

function update(e) {
  x.value = e.pageX
  y.value = e.pageY
}

onMounted(() => window.addEventListener('mousemove', update))
onUnmounted(() => window.removeEventListener('mousemove', update))
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>
```

如果想在很多个组件中复用这个逻辑，我们可以将它封装为一个组合函数。

```vue
// mouse.js
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  function update(e) {
    x.value = e.pageX
    y.value = e.pageY
  }

  // 一个组合式函数也可以挂靠在所属组件的生命周期上
  // 来启动和卸载副作用
  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  return { x, y }
}
</script>
```

在组件中使用

```vue
<script setup>
import { useMouse } from './mouse'

const { x, y } = useMouse()
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>
```

## [单文件组件中的组合式 API 语法糖 `<script setup>`](https://v3-migration.vuejs.org/zh/#notable-new-features)

要启用该语法，需要在 `<script>` 代码块上添加 `setup` attribute。`<script setup>` 中的代码会在每次组件实例被创建的时候执行。

### 顶层绑定会暴露给模板

当使用 `<script setup>` 的时候，任何在 `<script setup>` 声明的顶层的绑定 (包括变量，函数声明，以及 import 导入的内容) 都能在模板中直接使用：

```vue
<script setup>
import { capitalize } from './helpers'
import MyComponent from './MyComponent.vue' // 组件

// 变量
const msg = 'Hello!'

// 函数
function log() {
  console.log(msg)
}
</script>

<template>
  <button @click="log">{{ msg }}</button>
  <div>{{ capitalize('hello') }}</div>
  <MyComponent />
</template>

```

### 响应式

ref 在模板中使用时会自动解包

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
```

### defineProps 和 defineEmits

为了在声明 `props` 和 `emits` 选项时获得完整的类型推导支持，我们可以使用 `defineProps` 和 `defineEmits` API，它们将自动地在 `<script setup>` 中可用：

```vue
<script setup>
const props = defineProps({
  foo: String
})

const emit = defineEmits(['change', 'delete'])
// setup 代码
</script>
```

