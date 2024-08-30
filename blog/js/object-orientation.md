# 面向对象
猫是“类”，具体的某一只猫是“对象”。

类 <- 原型 <- 对象：“对象”通过原型与“类”连接，“类”是创建“对象”的模板

## 创建一个 Cat 类
每只猫咪都会有身高、体重、名字，爱睡觉、跑酷，这些属性每只猫咪都具有。
```javascript
class Cat {
  // 属性
  height;
  weight;
  nickName;
  sleep() {};
  jump() {}
}
```

## 创建一只 猫咪 实例
身高、体重、名字、爱睡觉、跑步都是描述**某一个对象**的属性或者方法，所以这些属性和方法称为**对象属性/方法**，或者称为**实例属性/方法**。
```javascript
class Class {
  // 属性
  height
  weight
  nickName
  
  // 描述特征
  constructor(height, weight, nickName) {
    this.height = height
    this.weight = weight
    this.nickName = nickName
  }

  // 描述特征
  sleep() {
    this.weight++
  }
  jump() {
    this.weight--
  }
}
```

## 静态成员
静态方法和属性是类的公共成员，与具体的对象没用关系。

比如猫咪有多少只，数量是用来修饰猫咪这个种类的，而不是具体的某只猫咪。
```javascript
class Cat {
  // 实例属性
  height
  weight
  nickName

  // 静态属性
  static totle = 0

  // 描述特征
  constructor(height, weight, nickName) {
    this.height = height;
    this.weight = weight;
    this.nickName = nickName;

    // 每创建一只猫咪 猫咪这个种类的数量都会 +1
    Cat.totle += 1
  }
    // 描述特征
  sleep() {
    this.weight++
  }
  jump() {
    this.weight--
  }
}
```

之前老是记不清某些方法的调用，比如：
```javascript
const num = 123.6
// 实例方法：对某一个数字四舍五入
num.toFixed()

// 静态属性：指的不是某一个数字，而是在JS中 Number这个类的最大值
Number.MAX_VALUE

// 静态方法：判断是否为NaN，不只是对某个数字操作
Number.NaN()
```

## 访问器 getter setter
当前加购某类商品，商品的总价 = 数量 * 单价；
```javascript
class Product {
  // 属性
  name
  unitPrice
  chooseNumber = 0

  constructor(name, unitPrice, chooseNumber) {
    this.name = name;
    this.unitPrice = unitPrice
    this.chooseNumber = chooseNumber
    // this.totalPrice = this.unit * this.choosePrice 1. 不推荐 ❌
  }

  // 2. 不推荐 ❌
  // 获取当前商品总价 
  // getTotalPrice() {
  //   return this.unitPrice * this.chooseNumber
  // }

// 3. 推荐 ⭕️
  get totalPrice() {
    return this.unitPrice * this.chooseNumber
  }
  set chooseNumber(num) {
    if(num < 0) {
      console.log('Error')
      reutrn
    }
  }
}

const p1 = new Product('馒头', 0.5, 10)
// p1.getTotalPrice()
console.log(p1.totalPrice) 
```
不推荐原因：
1. 像totalPrice这种由实例属性计算出的属性，通常不应该定义在构造函数中，因为一旦两个属性有任意一个改变，都需要手动改变；
2. totalPrice是一个属性 如果写成方法调用时语义不好；

> 有时需要允许访问返回动态计算值的属性，或者你可能需要反映内部变量的状态，而不需要使用显式方法调用。在 JavaScript 中，可以使用 getter 来实现。

使用 `getter` 和 `setter`：  
- `getter`：将对象属性(totalPrice)绑定到查询该属性(p.totalPrice)时将被调用的函数  
- `setter`：当设置属性时，set 语法将对象属性绑定到要调用的函数

## 把ES6 Class 降级到 ES5 function