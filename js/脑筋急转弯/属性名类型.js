// 对象的属性名l类型(key)只能是 String 或 Symbol，如果不是会转化为String类型。
let a1 = { 1: 'a1' }
a1[1] = 'a2'
a1['1'] = 'a3'
console.log(a1[1]) // a3

let a = {},
  b = { key: 'b' },
  c = { key: 'c' }
a[b] = 123
a[c] = 456
console.log(a[b]) // 456

// 原因
const obj = { foo: 'bar' }
console.log(obj.toString()) // [object Object]
console.log(a[b] === a['[object Object]'], a[c] === a['[object Object]']) // true、true
// a[b] 和 a[c] === a['[object Object]']
