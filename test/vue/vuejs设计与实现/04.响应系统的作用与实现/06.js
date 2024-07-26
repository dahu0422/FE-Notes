// 目标：支持嵌套函数
// 分析：之所以修改 obj.foo 只触发了 effectFn2 函数，是因为执行时 activeEffect 被 effectFn2 覆盖了，导致收集依赖时 foo 中添加的也是 effectFn2 函数
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
    const effectsToRun = new Set(effects)
    effectsToRun && effectsToRun.forEach((fn) => fn())
  }
}

let activeEffect
// effect 栈
let effectStack = []
function effect(fn) {
  function effectFn() {
    cleanup(effectFn)
    // 当调用 effect 注册副作用函数时，将副作用函数赋值给 activeEffect
    activeEffect = effectFn
    // 在调用副作用函数前，将当前副作用函数压入栈中
    effectStack.push(effectFn)
    // 执行副作用函数
    fn()
    // 在调用副作用函数后，将当前副作用函数弹出栈，并把 activeEffect 还原为之前的值
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

// debugger
// effect(function effectFn1() {
//   console.log('effectFn1 run')

//   effect(function effectFn2() {
//     console.log('effectFn2 run')
//     temp2 = obj.bar
//   })
//   temp1 = obj.foo
// })

// 问题：无限循环
effect(() => {
  obj.foo++
})
