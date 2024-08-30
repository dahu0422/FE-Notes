# 深拷贝
深拷贝原理：创建一个新对象，并且递归的复制对象的所有属性。对于每个引用类型的属性，会创建一个新的实例，并复制其内容，确保原对象与拷贝对象之间完全独立。

```javascript
function deepClone(val, hash = new WeakMap()) {
  // 基本类型、function、自身应用直接返回
  if (typeof val === null || typeof val !== 'object') return val
  if (hash.has(val)) return hash.get(val)

  // 创建对象并设置原型
  const result = Array.isArray(val) ? [] : {}
  Object.setPrototypeOf(result, Object.getPrototypeOf(val))

  // 将当前val与克隆结果存入hash表，解决循环引用
  hash.set(val, result)

  // 拷贝对象自身属性
  for (let key in val) {
    if (val.hasOwnProperty(key)) {
      result[key] = deepClone(val[key], hash)
    }
  }

  return result
}

// 克隆数组
const arr = [1, 2, 3, [4, 5]]
const deepArr = deepClone(arr)
console.log('克隆数组:', deepArr, deepArr === arr)

// 克隆对象
const obj = { a: 123, b: 456, c: { d: 123456 } }
const deepObj = deepClone(obj)
console.log('克隆对象:', deepObj, deepObj === obj)

// 3.克隆自定义构造函数的对象
class customTest {
  constructor() {
    this.a = 123
    this.b = 456
  }
  c() {
    console.log('function c')
  }
}
customTest.d = 789

const customObj = new customTest()
const deepCustomObj = deepClone(customObj)
console.log(customObj)
console.log('克隆自定义对象:', deepCustomObj, deepCustomObj === customObj)

// 克隆循环引用对象
const circularObj = { a: 123 }
circularObj.b = circularObj
const deepCircularObj = deepClone(circularObj)
console.log('克隆循环引用对象:', deepCircularObj, deepCircularObj === circularObj)
```
为了解决**循环引用**的问题，使用WeakMap来存储已经拷贝过的对象，如果遇到循环引用，则直接返回该对象。