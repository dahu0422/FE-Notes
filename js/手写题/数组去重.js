/**
 * 数组去重
 * 原始值使用严格相等比较
 * 对象值递归比较所有属性，属性数量、属性值必须一致
 * 数组中均为基础类型、对象类型
 * @param { Array } arr
 * @return { Array }
 */
const arr = [
  1,
  2,
  2,
  NaN,
  NaN,
  0,
  +0,
  -0,
  { a: 1, b: { c: 1 } },
  { a: 1, b: { c: 1 } },
  { a: 1, b: { c: 2 } },
  [1, 2, [3]],
  [1, 2, [4]],
  null,
  undefined,
]
function uniqueArr(arr) {
  let res = []
  for (let i = 0; i < arr.length; i++) {
    let isFind = false
    for (let j = 0; j < res.length; j++) {
      // 判断两者相同
      if (isEval(arr[i], res[j])) {
        isFind = true
        break
      }
    }
    if (!isFind) {
      res.push(arr[i])
    }
  }
  return res
}
// 比较两者是否相同
function isEval(v1, v2) {
  let res = null
  // 对象
  if (v1 instanceof Object && v2 instanceof Object) {
    for (let key in v1) {
      res = v2.hasOwnProperty(key) && isEval(v1[key], v2[key])
    }
  } else {
    // 基本类型
    res = v1 === v2
  }
  return res
}

console.log(uniqueArr(arr))
