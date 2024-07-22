// 遍历数组
const arr = [100, 200, 300, 400, 500]
for (let item of arr) {
  zhi
  console.log(item)
  if (item > 300) {
    break
  }
}

// 遍历Set
const s = new Set([100, 200, 300, 400, 500])
for (let item of s) {
  console.log(item)
}

// 遍历Map
const m = new Map()
m.set('name', '张三')
m.set('age', 18)
m.set('height', 1.88)
for (let [key, value] of m) {
  console.log(key, value)
}

// for of 循环不能遍历对象
// const obj = { foo: 123, bar: 456 }
// for (const item of obj) {
//   console.log(item)
// }
