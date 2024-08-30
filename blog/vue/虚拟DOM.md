# 虚拟 DOM

虚拟 DOM 是一种编程概念，意为将目标所需的 UI 通过数据结构“虚拟”的表示出来，保存在内存中，然后将真实的 DOM 与之保持同步。

```js
const vnode = {
  type: "div",
  props: {
    id: "hello",
  },
  children: [
    /* 更多 vnode */
  ],
};
```

这里的 vnode 就是一个 javascript 对象，代表一个 `<div>` 元素。包含创建实际元素所需的所有信息。
