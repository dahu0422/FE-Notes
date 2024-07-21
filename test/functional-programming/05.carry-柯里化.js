const _ = require('lodash')

// const curryMatch = _.curry((reg, str) => str.match(reg))
// const curryFilter = _.curry((fn, arr) => arr.filter(fn))

// 模拟 curry 函数
function myCurry(fn) {
  // 判断 实参 与 形参 个数是否相同
  return function curriedFn(...args) {
    if (args.length < fn.length) {
      return function () {
        return curriedFn.apply(...args.concat(Array.from(arguments)))
      }
    }
    return fn(...args)
  }
}

const curryMatch = myCurry((reg, str) => str.match(reg))
const curryFilter = myCurry((fn, arr) => arr.filter(fn))
const haveSpace = curryMatch(/\s+/g)
const findSpace = curryFilter(haveSpace)
console.log(findSpace(['John Connor', 'John_Donne']))
