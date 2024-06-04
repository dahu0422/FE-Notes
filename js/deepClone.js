// 深度克隆
const arr = [1, [1, 2]]
const obj = { a: 1, b: [1, 2] }

function deepClone(value) {
  // 数组类型
  if (Array.isArray(value)) {
    let clone = []
    for (let i = 0; i < value.length; i++) {
      clone[i] = deepClone(value[i])
    }
    return clone
  }
  // 对象类型
  if (typeof value === 'object' && value !== null) {
    let clone = {}
    for (i in value) {
      clone[i] = deepClone(value[i])
    }
    return clone
  }
  // 基本类型直接返回
  return value
}
const cloneObj = deepClone(obj)
console.log(cloneObj.b === obj.b)
