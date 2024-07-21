// 记忆函数
const _ = require('lodash')

function getArea(r) {
  console.log(r)
  return Math.PI * r * r
}
// let getAreaWithMemory = _.memoize(getArea)
// console.log(getAreaWithMemory(4))
// console.log(getAreaWithMemory(4))
// console.log(getAreaWithMemory(4))
// memoize 缓存了函数的返回值

// 模拟 lodash memoize 函数
function myMomoize(fn) {
  let cache = {}
  return function () {
    let key = JSON.stringify(arguments)
    if (cache[key]) {
      return cache[key]
    }
    return (cache[key] = fn.apply(this, arguments))
  }
}
let getAreaWithMemory = myMomoize(getArea)
console.log(getAreaWithMemory(4))
console.log(getAreaWithMemory(4))
console.log(getAreaWithMemory(4))
