# call、apply、bind

## Function.prototype.call

`Function` 实例的 `call()` 方法使用指定的 `this` 值和提供的参数调用此函数。

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

参数：

- thisArg：调用 func 时要使用的 this 值；
- ...args：传递给 func 的**参数列表**

```javascript
func.call(thisArg, ...args)
```

## Function.prototype.apply

`Function` 实例的 `apply()` 方法使用指定的 `this` 值和提供的数组（或类似数组的对象）来调用此函数。

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

参数：

- thisArg：调用 func 时要使用的 this 值；
- argsArray：传递给 func 的**类数组对象**;

```javascript
func.apply(thisArg, argsArray)
```

## Function.prototype.bind

调用 `bind` 会创建一个新函数。当这个新函数被调用时，`bind()` 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。

```javascript
function Produce(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  const func = Produce.bind(this, name, price)
  func()
  this.category = "food";
}

console.log(new Food("cheese", 5).name)
```

参数：

- thisArg：作为调用函数的 this 值；
- ...args：传递给新函数的**参数列表**。

```javascript
func.bind(thisArg, ...args)
```

## 参考

[MDN-call](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)  
[MDN-apply](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)  
[MDN-bind](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
