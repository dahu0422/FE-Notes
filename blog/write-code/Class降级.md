# 把ES6 Class 降级成 ES5 Function

下面是一个用ES6写的Product Class，转换为ES5写法的 Function
```javascript
class ProductClass {
  static count = 0
  constructor(name, unitPrice, number) {
    this.name = name
    this.unitPrice = unitPrice
    this.number = number
    Product.count++
  }
  get totalPrice() {
    return this.unitPrice * this.number
  }
  increase() {
    this.number++
  }
}
```

```javascript
function ProductFn(name, unitPrice, number) {
  // Class 必须通过 new 关键字声明一个对象；而函数具有【二义性】可以直接调用，所以要判断是否通过 new 关键字声明，否则抛出一个错误；
  if (Object.getPrototypeOf(this) !== ProductFn.prototype) {
    throw new TypeError(
      "Class constructor Product cannot be invoked without 'new' "
    )
  }

  this.name = name
  this.unitPrice = unitPrice
  this.number = number
  ProductFn.count++
}

ProductFn.count = 0
ProductFn.prototype.increase = function () {
  this.number++
}
// 使用Object.defineProperty 模拟 get效果
Object.defineProperty(ProductFn.prototype, 'totalPrice', {
  // enumerable: false, // 不可枚举
  get: function() {
    return this.number * this.unitPrice
  }
})
```