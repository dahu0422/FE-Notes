# new 操作符

new 操作符用于创建一个**用户定义的对象类型**的实例或具有**构造函数的内置对象**的实例

使用 `new` 关键字创建一个新实例时，会执行以下操作：

1. 创建新对象：`new` 操作符会在内存中创建一个空的 JavaScript 对象。
2. 设置原型链：新对象内部的 `__proto__` 属性被设置为构造函数的 `prototype` 属性的值。
3. 绑定 this 值：`new` 操作符会改变构造函数内部的 `this` 值，指向新创建的对象。
4. 执行构造函数：`new` 操作符调用构造函数，执行构造函数内部的代码，初始化新对象的属性和方法。
5. 返回新对象：如果构造函数返回的是一个对象，则返回这个对象；否则返回新对象。

## myNew

```javascript
/**
 * 模拟实现一个new操作符
 * @param {Function} constructor 构造函数
 * @param  {...any} args 属性值
 */
function myNewFn(constructor, ...args) {
  // 创建一个新的空对象
  const newObj = Object.create(constructor.prototype);

  // 将构造函数的作用域绑定到新对象上，并传递参数执行构造函数
  const result = constructor.apply(newObj, args);

  // 检测构造函数返回值是否为对象，且不为null；如果是则返回该对象，否则返回新创建的对象
  return typeof result === "object" && result !== null ? result : newObj;
}
```

test

```javascript
function Person(name, age) {
  this.name = name;
}
Person.prototype.sayHello = function () {
  console.log(`Hello, my name is ${this.name}`);
};
const person = myNewFn(Person, "dahu");
person.sayHello(); // Hello, my name is dahu
```

`new` 操作符的核心作用是用于构造函数，创建并初始化一个特定类型的对象实例。模拟 `new` 操作符的行为时应关注创建对象实例。

对于基本类型`Number`, `String`, `Boolean`, `Symbol`等，不应该使用`new`操作符。

## new vs Object.create()

`new` 操作符和 `Object.create` 方法都是用于创建新对象的，但两者之间的区别在于：`new` 创建的对象不仅继承了原型上的方法，还有构造函数内的属性，而 `Object.create` 只设置了原型链。

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.say = function () {
  console.log(`${this.name} ${this.age}`);
};

let p1 = new Person("张三", 18);
p1.say(); // 张三 18

let p2 = Object.create(Person.prototype);
p2.name = "李四";
p2.age = 19;
p2.say();

console.log(p2.__proto__ === Person.prototype); // true
```
