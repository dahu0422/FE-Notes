let name = 'dahu',
  age = 26,
  money = 20

let str1 = '',
  str2 = ''
const effect1 = () => (str1 = `${name}今年${age}岁，存款${money}元`)
const effect2 = () => (str2 = `${age}岁的${name}居然有${money}元`)

effect1()
effect2()
console.log(str1, str2)

// 当money变化时，手动出发依赖
// money = 300
// effect1()
// effect2()
// console.log(str1, str2)

let dep = new Set()
// 通过track收集依赖
function track() {
  dep.add(effect1)
  dep.add(effect2)
}
track()

money = 300
// 当money变化时，通过trigger触发依赖
function trigger() {
  dep.forEach((effect) => effect())
}
trigger()
console.log(str1, str2)
