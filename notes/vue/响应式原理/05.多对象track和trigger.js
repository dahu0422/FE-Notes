const person = { name: '林三心', age: 22 }
const animal = { type: 'dog', height: 50 }
let nameStr1 = ''
let nameStr2 = ''
let ageStr1 = ''
let ageStr2 = ''
let typeStr1 = ''
let typeStr2 = ''
let heightStr1 = ''
let heightStr2 = ''

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
const effectTypeStr1 = () => {
  typeStr1 = `${animal.type}是个大菜鸟`
}
const effectTypeStr2 = () => {
  typeStr2 = `${animal.type}是个小天才`
}
const effectHeightStr1 = () => {
  heightStr1 = `${animal.height}已经算很高了`
}
const effectHeightStr2 = () => {
  heightStr2 = `${animal.height}还算很矮啊`
}

const targetMap = new WeakMap()
function track(target, key) {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }

  if (target === person) {
    if (key === 'name') {
      dep.add(effectNameStr1)
      dep.add(effectNameStr2)
    } else {
      dep.add(effectAgeStr1)
      dep.add(effectAgeStr2)
    }
  } else {
    if (key === 'type') {
      dep.add(effectTypeStr1)
      dep.add(effectTypeStr2)
    } else {
      dep.add(effectHeightStr1)
      dep.add(effectHeightStr2)
    }
  }
}

track(person, 'name') // 收集person.name的依赖
track(person, 'age') // 收集person.age的依赖
track(animal, 'type') // animal.type的依赖
track(animal, 'height') // 收集animal.height的依赖
console.log(targetMap.get(person), targetMap.get(animal))

function trigger(target, key) {
  let depsMap = targetMap.get(target)
  if (depsMap) {
    let dep = depsMap.get(key)
    if (dep) {
      dep.forEach((effect) => effect())
    }
  }
}
