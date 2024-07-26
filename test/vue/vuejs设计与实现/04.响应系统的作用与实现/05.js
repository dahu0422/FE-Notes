// 目标：解决副作用函数遗留问题
/**
 * 分析：
 * 在初始化时 obj.ok 设为 ture，会建立 obj.ok 和 obj.text 与匿名 effectFn 之间的依赖关系。
 * 当 obj.ok 设置为 false 时，obj.text 应该被移除与 effectFn 之间的依赖关系。
 * 但是修改 obj.text 值会发现，匿名 effectFn 又一次执行，依赖关系没有被移除。
 */
// 解决方案：每次副作用函数执行前，删除与副作用函数之间的依赖关系。要想删除依赖关系，需要知道副作用函数与依赖关系之间的映射关系。

const data = {
  text: 'hello world',
  ok: true,
  foo: true,
  bar: true,
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
    const effectsToRun = new Set(effects)
    effectsToRun && effectsToRun.forEach((fn) => fn())
  }
}

// 用一个全局变量存储被注册的副作用函数
let activeEffect
function effect(fn) {
  function effectFn() {
    cleanup(effectFn)
    // 当 effectFn 执行时，将其设置为当前激活的副作用函数
    activeEffect = effectFn
    fn()
  }
  // 用来存储与 副作用函数 有关的 依赖集合
  effectFn.deps = []
  effectFn()
}

// 清除 effectFn 的所有依赖
function cleanup(effectFn) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    const deps = effectFn.deps[i]
    deps.delete(effectFn)
  }
  effectFn.deps.length = 0
}

debugger
// effect(() => {
//   console.log('effect run')
//   document.body.innerHTML = obj.ok ? obj.text : 'not'
//   console.log(bucket)
// })

// 问题：在嵌套副作用函数中，尝试修改 obj.foo 得到的结果是 effectFn2 函数执行了，effectFn1 函数没有执行。
effect(function effectFn1() {
  console.log('effectFn1 run')

  effect(function effectFn2() {
    console.log('effectFn2 run')
    temp2 = obj.bar
  })
  temp1 = obj.foo
})
