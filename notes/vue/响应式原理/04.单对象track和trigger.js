const person = { name: '林三心', age: 22 }
let nameStr1 = ''
let nameStr2 = ''
let ageStr1 = ''
let ageStr2 = ''

const effectNameStr1 = () => {
  nameStr1 = `${person.name}是个大菜鸟`
}
const effectNameStr2 = () => {
  nameStr2 = `${person.name}是个小天才`
}
const effectAgeStr1 = () => {
  ageStr1 = `${person.age}岁已经算很老了`
}
const effectAgeStr2 = () => {
  ageStr2 = `${person.age}岁还算很年轻啊`
}

effectNameStr1()
effectNameStr2()
effectAgeStr1()
effectAgeStr2()
console.log(nameStr1, nameStr2, ageStr1, ageStr2)
// 林三心是个大菜鸟 林三心是个小天才 22岁已经算很老了 22岁还算很年轻啊

// person.name = 'sunshine_lin'
// person.age = 18
// 手动触发依赖
// effectNameStr1()
// effectNameStr2()
// effectAgeStr1()
// effectAgeStr2()
// console.log(nameStr1, nameStr2, ageStr1, ageStr2)
// sunshine_lin是个大菜鸟 sunshine_lin是个小天才 18岁已经算很老了 18岁还算很年轻啊

const depsMap = new Map()
function track(key) {
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }

  if (key === 'name') {
    dep.add(effectNameStr1)
    dep.add(effectNameStr2)
  } else {
    dep.add(effectAgeStr1)
    dep.add(effectAgeStr2)
  }
}

track('name')
track('age')
console.log(depsMap)

// 触发依赖
function trigger(key) {
  let dep = depsMap.get(key)
  if (dep) {
    dep.forEach((effect) => effect())
  }
}
person.name = 'dahu'
person.age = 26
trigger('name')
trigger('age')
console.log(nameStr1, nameStr2, ageStr1, ageStr2)
