# myBind
`Function.prototype.bind()` 接收一个this参数和一个参数列表，调用 bind 会创建一个新函数，当这个新函数被调用时，bind() 的第一个参数将作为它运行时的this，后面的参数将作为原函数的参数，再调用一次。
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