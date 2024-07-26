// 目标：完善 bucket 的数据结构，要想完善 bucket 的数据结构，要弄清target -- key -- effectFn 之间的关系。

let activeEffect
function effect(fn) {
  activeEffect = fn
  fn()
}
const data = {
  text: 'hello world',
}
const bucket = new WeakMap()
const obj = new Proxy(data, {
  get(target, key) {
    if (!activeEffect) return target[key]
    let depsMap = bucket.get(target)
    if (!depsMap) {
      bucket.set(target, (depsMap = new Map()))
    }
    let deps = depsMap.get(key)
    if (!deps) {
      depsMap.set(key, (deps = new Set()))
    }
    deps.add(activeEffect)
    return target[key]
  },
  set(target, key, value) {
    target[key] = value
    const depsMap = bucket.get(target)
    if (depsMap) {
      const deps = depsMap.get(key)
      deps && deps.forEach((fn) => fn())
    }
  },
})

effect(() => {
  console.log('effect run')
  document.body.innerHTML = obj.text
})

setTimeout(() => {
  console.log()
  obj.notExist = 'hello vue3'
}, 1000)
