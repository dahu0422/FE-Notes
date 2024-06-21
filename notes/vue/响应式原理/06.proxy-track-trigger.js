function reactive(target) {
  const handler = {
    get(target, key, receiver) {
      console.log('触发get')
      track(receiver, key) // 访问时收集依赖
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      Reflect.set(target, key, value, receiver)
      trigger(receiver, key) // 设值时自动通知更新
    },
  }
  return new Proxy(target, handler)
}
const person = reactive({ name: 'dahu', age: 26 })
const animal = reactive({ type: 'dog', height: 30 })

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

let activeEffect = null
function effect(fn) {
  activeEffect = fn
  activeEffect()
  activeEffect = null
}

const targetMap = new WeakMap()
function track(target, key) {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  let deps = depsMap.get(key)
  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }
  // 收集依赖
  deps.add(activeEffect)
}

effect(effectNameStr1)
effect(effectNameStr2)
effect(effectAgeStr1)
effect(effectAgeStr2)
effect(effectTypeStr1)
effect(effectTypeStr2)
effect(effectHeightStr1)
effect(effectHeightStr2)

console.log(targetMap.get(person), targetMap.get(animal))
