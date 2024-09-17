# Scoped Style

当 `<style>` 标签带有 scoped attribute 的时候，它的 CSS 只会影响当前组件的元素

```html
<style scoped>
  .example {
    color: red;
  }
</style>

<template>
  <div class="example">hi</div>
</template>
```

转化为

```html
<style>
  .example[data-v-f3f3eg9] {
    color: red;
  }
</style>

<template>
  <div class="example" data-v-f3f3eg9>hi</div>
</template>
```

当 Vue 编译单文件组件时，如果 `<style>` 标签带有 scoped 属性，Vue 会为该组件内的每个 CSS 选择器生成一个唯一的属性选择器，例如 `[data-v-xxxxxxx]`，这里的 xxxxxxx 是一个唯一的标识符。

这个标识符通常是基于组件的唯一 ID 或者是一个哈希值。

对于带有 scoped 特性的样式，Vue 会将选择器转换为带有唯一属性选择器的形式。例如 原本的选择器 `.class` 会被转化成 `.class[data-v-xxxxxxx]`

### 子组件的根元素

使用 `scoped` 后，父组件的样式将不会渗透到子组件中。不过，子组件的根节点会同时被父组件的作用域样式和子组件的作用域样式影响。这样设计是为了让父组件可以从布局的角度出发，调整其子组件根元素的样式。

### 深度选择器

处于 scoped 样式中的选择器如果想要做更“深度”的选择，也即：影响到子组件，可以使用 `:deep()` 这个伪类：

```html
<style scoped>
  .a :deep(.b) {
    /* ... */
  }
</style>
```

编译为

```css
.a[data-v-f3f3eg9] .b {
  /* ... */
}
```

在修改第三方组件库样式时会用到
