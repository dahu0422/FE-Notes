# diff 算法

1. diff 算法是干什么的
2. 何时执行
3. 执行方式
4. vue3 中的优化

diff 算法在 vue 中成为 patching 算法，是一种优化策略，用于计算新旧两颗虚拟 DOM 树之间的差异，并根据这些差异最小化地更新实际的 DOM，从而提升应用的渲染性能。

vue 中 diff 执行的时刻是在组件内响应式数据变更触发示例实例执行其更新函数，更新函数会再次执行 render 函数获得最新的虚拟 DOM，然后执行 patch 函数，并传入新旧两次虚拟 DOM，通过对比两者找到变化的地方，最后将其转化为对应的 DOM 操作。

patch 过程是一个递归的过程，遵循深度优先、同层比较的策略。

vue3 中的 patch 的过程如下

- 首先判断两个节点是否为相同节点类型，不同则删除重新创建
- 如果两个节点都是文本节点，则更新为本内容
- 如果两个节点都是元素节点则递归更新子元素，同时更新元素属性
  - 新的子节点是文本，老的子节点是文本：更新文本
  - 新的子节点是文本，老的子节点是数组：清空，设置文本
  - 新的子节点是数组，老的子节点是文本：清空文本，创建新子节点数组中的子元素
  - 新的子节点是数组，老的子节点是数组：比较两组子节点

源码位置：packages/runtime-core/src/renderer.ts

通过 `isSameVNodeType` 比较两个节点是否相同，主要是通过 `type` 和 `key` 两个属性来判断。

在 `patch` 算法中会根据 `type` 的不同来分别处理。举个典型例子 `Element`

如果 `shapeFlags` 为 `Element` 会进入 `processElement`，在`processElement` 方法中会判断是否为首次挂载节点。

首次挂载节点进入 `mountElement` 方法，否则会进入 `patchElement` 方法。

在 `patchElement`中根据 `patchFlag` 会做具体判断，比如 `patchFlag` 为 `TEXT` 则会直接更新文本，`patchFlag` 为 `CLASS` 则会更新 `class`，`patchFlag` 为 `STYLE` 则会更新 `style`，`patchFlag` 为 `PROPS` 则会更新 `props`，`patchFlag` 为 `CHILDREN` 则会更新子元素。
