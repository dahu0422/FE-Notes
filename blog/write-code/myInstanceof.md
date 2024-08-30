# myInstanceof
`instanceof`原理：检测构造函数的`prototype`属性，是否在某个实例对象的的原型链上。即`obj.__proto__ === Object.prototype`。

`Object.getPrototypeOf()`获取实例对象的原型

```javascript
/**
 * 判断构造函数的prototype是否出现在实例对象的原型链上
 * @param {Object} instance 实例对象
 * @param {Function} constructor 构造函数
 * @returns
 */
function myInstanceof(instance, constructor) {
  // 检测instance是否为对象
  if (typeof instance !== 'object' || instance === null) return false

  // 获取实例对象的原型
  let proto = Object.getPrototypeOf(instance)
  // 遍历原型链直到null
  while (proto !== null) {
    // 如果构造函数的prototype出现在实例对象的原型链上，返回true
    if (proto === constructor.prototype) {
      return true
    } else {
      // 否则继续遍历原型链
      proto = Object.getPrototypeOf(proto)
    }
  }
  // 如果遍历完原型链，没有找到构造函数的prototype，返回false
  return false
}
```

测试一下
```javascript
// ------- myInstanceof --------
console.log(myInstanceof('str', String))
console.log(myInstanceof(2, Number))
console.log(myInstanceof(true, Boolean))
console.log(myInstanceof(Symbol('12'), Symbol))

console.log(myInstanceof({}, Object))
console.log(myInstanceof([], Array))
console.log(myInstanceof(new Map(), Map))
console.log(myInstanceof(new Set(), Set))
console.log(myInstanceof(new String(''), Boolean))


// --------- instanceof ---------
// 字面量返回false
console.log('str' instanceof String)
console.log(2 instanceof Number)
console.log(true instanceof Boolean)
console.log(Symbol('12') instanceof Symbol)

// 对象类型可以准确判断
console.log(new String('str') instanceof String)
console.log(new Number(2) instanceof Number)
console.log(new Boolean(true) instanceof Boolean)
console.log([] instanceof Array)
console.log({} instanceof Object)
```