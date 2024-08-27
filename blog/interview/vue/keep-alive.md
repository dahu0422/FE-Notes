# keep-alive 内置组件

回答思路：

- keep-alive 作用与用法
- 使用细节，缓存指定/排除、结合 router、transition
- 组件缓存后更新可以用 activated、beforeRouteEnter
- 原理阐述

## keep-alive 作用与用法

keep-alive 是一个**内置组件**，在动态组件切换时缓存被移除的组件实例，而不是销毁他们。这样在组件切换过程中将状态保留在内存重，避免重复渲染 DOM。

```vue
<keep-alive>
  <component :is="view"></component>
</keep-alive>
```

## include && exclude

`<keep-alive>` 默认会缓存内部的所有组件实例，可以通过 `include` 和 `exclude` prop 来明确指定缓存哪些组件或排除哪些组件。

它会根据组件的 `name` 选项进行匹配，所以如果想要条件性的被 `keep-alive` 缓存就必须显式地声明 `name` 选项。

## keep-alive 与 router-view

vue3 中结合 router-view 发生了变化，之前是 `keep-alive` 包裹 `router-view`，现在是 `router-view` 包裹`keep-alive`

```vue
<router-view v-slot="{ Component }">
  <keep-alive>
    <component :is="Component" />
  </keep-alive>
</router-view>
```

## 缓存实例生命周期

一个持续存在的组件可以通过 `onActivated()` 和 `onDeactivated()` 注册相应的两个状态的生命周期钩子。

```vue
<script setup>
import {(onActivated, onDeactivated)} from 'vue'
onActivated(() =>{" "}
{
  // 调用时机为首次挂载
  // 以及每次从缓存中被重新插入时
}
) onDeactivated(() => {
  // 在从 DOM 上移除、进入缓存
  // 以及组件卸载时调用
})
</script>
```

- onActivated：首次挂载、每次从缓存中重新插入时会被调用
- onDeactivated：从 DOM 上移除、进入缓存以及组件卸载时会被调用
