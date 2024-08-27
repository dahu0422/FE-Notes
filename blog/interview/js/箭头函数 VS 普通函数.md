# 箭头函数

## 语法格式
箭头函数既可以使用**表达式体**（expression body），也可以使用通常的**块体**（block body）。
```javascript
// 表达式体语法，隐含返回值
const add = (a, b) => a + b

// 块体语法，显示返回值
const add = (a, b) => {
  return a + b
}

// 普通函数
function add(a, b) {
  return a + b
}
```
使用表达式体语法 `(params) => { object: literal }` 返回对象字面量时，不能按预期工作。因为只有当箭头后面的标记不是左括号 `{` 时，JavaScript 才会将箭头函数视为表达式体，需要用 `()` 包装起来。
```javascript
❌ const func = () => { foo: 1 } // 调用 func() 会返回 undefined！

⭕️ const func = () => ({ foo: 1 }) // 调用 func() 会返回 { foo: 1 }
```

## this 指向
- 在箭头函数中，this的值总是指向**定义箭头函数时所在的作用域**，即箭头函数所在的上下文。它没有自己的this。
- 在普通函数中，this的值取决于**函数的调用方式**。
```javascript
let obj = {
  value: 1,
  a: () => { console.log(this.value, this) }
  b() { console.log(this.value, this) }
}
obj.a() // undefined window
obj.b() // 1 Object
```

## 构造函数
- 箭头函数不能作为构造函数，因为箭头函数没有 `prototype` 属性，所以不能通过new调用。
- 普通函数可以被用作构造函数，允许创建新的对象实例。

## arguments对象
- 箭头函数没有 `arguments` 对象，但是可以通过 `...args` 的扩展运算符来达到类似的效果。
- 普通函数有自己的 `arguments` 对象，这是一个类数组对象，包含了传递给函数的所有参数。
```javascript
// 箭头函数 ...arg
const logArgs = (...args) => {
  args.forEach(arg => console.log(arg));
};
logArgs(1, 2, 3); // 输出: 1, 2, 3


// 普通函数 argument 对象
function logArgs() {
  for (let i = 0; i < arguments.length; i++) {
    console.log(arguments[i]);
  }
}
logArgs(1, 2, 3); // 输出: 1, 2, 3
```