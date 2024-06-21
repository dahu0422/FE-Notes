## 响应式原理

关联知识点
- [Object.defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)：静态方法会直接在一个对象上定义一个新属性，或修改其现有属性，并返回此对象。
- [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)：创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。
- [Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)：Reflect是一个内置对象，它提供拦截 JavaScript 操作的方法。这些方法与Proxy对象的方法相同。
```javascript
Reflect.get(target, property[, receiver]) // 获取对象身上某个属性的值
Reflect.set(target, property, value[, receiver]) // 设置对象身上某个属性的值
```
- [Set](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)：允许存储任何类型（无论是原始值还是对象引用）的唯一值。


参考
- [林三心画了8张图，最通俗易懂的Vue3响应式核心原理解析
](https://segmentfault.com/a/1190000041207010)
