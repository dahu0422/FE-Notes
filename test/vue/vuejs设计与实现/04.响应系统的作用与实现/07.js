/**
 * 目标：解决无限循环
 * 分析：因为 副作用函数 obj.foo ++ 同时触发了 track 之后又触发了 trigger 导致
 * 解决方案：如果 track 和 trigger 执行的是同一个副作用函数就触发
 */
const data = {
  foo: 1,
}
const bucket = new WeakMap()
const obj = new Proxy(data, {
  get(target, key) {
    track(target, key)
    return target[key]
  },
  set(target, key, value) {
    debugger
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
  activeEffect.deps.push(deps)
}

function trigger(target, key) {
  const depsMap = bucket.get(target)
  if (depsMap) {
    const effects = depsMap.get(key)
    const effectsToRun = new Set()
    effects &&
      effects.forEach((effectFn) => {
        // 如果 track 触发的副作用函数与当前正在执行的副作用函数相同，则不触发执行
        if (effectFn !== activeEffect) {
          effectsToRun.add(effectFn)
        }
      })
    effectsToRun &&
      effectsToRun.forEach((effectFn) => {
        effectFn()
      })
  }
}

let activeEffect
// effect 栈
let effectStack = []
function effect(fn) {
  function effectFn() {
    cleanup(effectFn)
    activeEffect = effectFn
    effectStack.push(effectFn)
    fn()
    effectStack.pop()
    activeEffect = effectStack[effectStack.length - 1]
  }
  effectFn.deps = []
  effectFn()
}

function cleanup(effectFn) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    const deps = effectFn.deps[i]
    deps.delete(effectFn)
  }
  effectFn.deps.length = 0
}

debugger
effect(() => {
  obj.foo += 1
})
