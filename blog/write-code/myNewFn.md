# myNewFn
new操作符执行步骤：
1. 创建一个空对象。
2. 设置原型链：将新对象内部的`__proto__`属性指向构造函数的`prototype`属性的值。
3. 绑定this：将构造函数的`this`指向新对象。
4. 执行构造函数：执行构造函数中的代码。
5. 返回新对象：如果构造函数返回的是一个对象，则返回这个对象；否则返回新对象。

`Object.create()`以一个对象作为原型，创建一个新对象。

```javascript
/**
 * 模拟实现一个new操作符
 * @param {Function} constructor 构造函数
 * @param  {...any} args 属性值
 */
function myNewFn(constructor, ...args) {
  // 创建一个新的空对象
  const newObj = Object.create(constructor.prototype)

  // 将构造函数的作用域绑定到新对象上，并传递参数执行构造函数
  const result = constructor.apply(newObj, args)

  // 检测构造函数返回值是否为对象，且不为null；如果是则返回该对象，否则返回新创建的对象
  return typeof result === 'object' && result !== null ? result : newObj
}
```

test
```javascript
function Person(name, age) {
  this.name = name
}
Person.prototype.sayHello = function () {
  console.log(`Hello, my name is ${this.name}`)
}
const person = myNewFn(Person, 'dahu')
person.sayHello() // Hello, my name is dahu
```

## 请不要new一个基本类型
`new`操作符的核心作用是用于构造函数，创建并初始化一个特定类型的对象实例。模拟`new`操作符的行为时应关注创建对象实例。

对于基本类型(`Number`, `String`, `Boolean`, `Symbol`等）不应该使用`new`操作符。