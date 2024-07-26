// 目标：封装
const data = {
  text: 'hello world',
  ok: true,
}
const bucket = new WeakMap()
const obj = new Proxy(data, {
  get(target, key) {
    track(target, key)
    return target[key]
  },
  set(target, key, value) {
    trigger(target, key)
    target[key] = value
    return true
  },
})

function track(target, key) {
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
}

function trigger(target, key) {
  const depsMap = bucket.get(target)
  if (depsMap) {
    const effects = depsMap.get(key)
    effects && effects.forEach((fn) => fn())
  }
}

let activeEffect
function effect(fn) {
  activeEffect = fn
  fn()
}

// effect(() => {
//   console.log('effect run')
//   document.body.innerHTML = obj.text
// })

// 问题：副作用函数遗留
effect(() => {
  console.log('effect run')
  document.body.innerHTML = obj.ok ? obj.text : 'not'
})
