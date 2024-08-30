# myCall
`Function.prototype.call()` 接收一个this参数和一个参数列表，调用该函数并返回结果。 
```javascript
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}
console.log(new Food('cheese', 5).name)
```

实现思路：将**当前函数（func）**绑定到**上下文对象上（thisArg）**，执行函数，删除上下文临时函数，返回执行结果。
```javascript
Function.prototype.myCall = function(context) {
  // 判断是否为被函数调用
  if(typeof this !== 'function') {
    throw new TypeError('myCall must be called on a function')
  }
  // 获取传入的this上下文，如果没有传入则默认为全局对象
  context = context || globalThis;

  // 获取参数列表
  const args = [...arguments].slice(1);

  // 生成唯一属性名，将当前函数绑定到上下文对象上
  const randomKey = Symbol()
  context[randomKey] = this;

  // 执行函数，删除上下文临时函数
  const result = context[randomKey](...args);
  delete context[randomKey];
  return result;
}
```