# myApply
`Function.prototype.apply` 接受一个this参数和一个参数数组，调用该函数并返回执行结果
```javascript
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.apply(this, [name, price]);
  this.category = "food";
}
console.log(new Food("cheese", 5).name);
```

实现思路：将**当前函数（func）**绑定到**上下文对象上（thisArg）**，执行函数，删除上下文临时函数，返回执行结果。
```javascript
Function.prototype.myApply = function(context, argsArray) {
  // 判断是否为被函数调用
  if(typeof this !== 'function') {
    throw new TypeError('myApply must be called on a function')
  }
  
  // 获取传入的this上下文，如果没有传入则默认为全局对象
  context = context || globalThis;
  
  // 生成唯一属性名，将当前函数绑定到上下文对象上
  const randomKey = Symbol()
  context[randomKey] = this;

  // 判断是否传入参数数组，执行函数，删除临时上下文返回执行结果
  let result 
  if(Array.isArray(argsArray)) {
    result = context[randomKey](...argsArray)
  } else {
    result = context[randomKey]()
  }
  delete context[randomKey]
  return result
  
}
```