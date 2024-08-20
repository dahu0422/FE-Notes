# Vue2 中的 data 属性为什么是一个函数

在 Vue 组件中定义 data 属性，只能是一个函数。如果是一个对象，会报错提示。

```js
const app = new Vue({
  el: "#app",
  data: function () {
    return {
      message: "Hello Vue!",
    };
  },
});
```

如果 data 是一个普通对象，那么所有基于这个组件创建的实例都会引用同一个对象。当某个实例改变了 data 中的一个属性，其他实例中的该属性也会改变，因为他们指向同一个内存地址。

当 data 被定义成一个函数时，每次创建一个新的组件实例时，都会调用这个函数创建一个新的对象。每个实例都会获得这个函数返回的新的对象。

下面通过两段伪代码分别示例一下 data 属性定义为对象和函数的情况

```js
// 伪代码 data 为 属性
function Component() {}

Component.prototype.data = {
  count = 0
}

// 创建组件实例
const CA = new Component()
const CB = new Component()

// 修改 count 属性
CA.data.count = 1
console.log(CA.data.count) // 1
console.log(CB.data.count) // 1
```

```js
// 伪代码 data 为 函数
function Component() {
  this.data = this.data()
}

Component.prototype.data = function () {
  return {
    count = 0
  }
}

// 创建组件实例
const CA = new Component()
const CB = new Component()

// 修改 count 属性
CA.data.count = 1
console.log(CA.data.count) // 1
console.log(CB.data.count) // 1
```

[官方解释](https://v2.vuejs.org/v2/guide/components.html#data-Must-Be-a-Function)
