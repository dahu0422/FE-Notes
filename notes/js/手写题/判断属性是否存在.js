/**
 * 判断对象上是否存在某个属性
 * @param {Object} obj 对象
 * @param {String} key 属性名
 */
function hasProperty(obj, key) {
  // 错误方式1
  // return obj[key] === undefined

  // 错误方式2：转为数组通过include判断
  // return Object.keys(obj).includes(key)

  // 错误方式3：hasOwnProperty判断
  // return obj.hasOwnProperty(key)

  // 正解1
  // return key in obj
  // 正解2：ES6引入的静态语法，检查一个对象是否拥有某个属性，包括自有和继承自原型链上的属性。
  return Reflect.has(obj, key)
}

const obj = { a: undefined }
Object.defineProperty(obj, 'c', { enumerable: false, value: 1 }) // 不可枚举，所以无法遍历出来

// 错误方式1
// console.log(hasProperty(obj, 'a'))
// 错误方式2
// console.log(hasProperty(obj, 'c')) // 无法判断出不可枚举的属性
// 错误方式3
// console.log(hasProperty(obj, 'toString'), obj.toString) // 无法判断出原型链上的属性
// 正解
console.log(
  hasProperty(obj, 'a'),
  hasProperty(obj, 'c'),
  hasProperty(obj, 'toString')
)
