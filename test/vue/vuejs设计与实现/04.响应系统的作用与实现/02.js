// 目标：解决 effect 副作用函数名称硬编码问题

// 存储当前正在执行的副作用函数
let activeEffect
// effect 用于注册副作用函数
function effect(fn) {
  activeEffect = fn
  fn()
}

const data = {
  text: 'hello world',
}
// 存储副作用函数
const bucket = new Set()
const obj = new Proxy(data, {
  // 拦截读取操作
  get(target, key) {
    // 将 activeEffect 中存储的副作用函数存储在 bucket 中
    if (activeEffect) {
      bucket.add(activeEffect)
    }
    return target[key]
  },
  set(target, key, value) {
    target[key] = value
    // 把副作用函数从桶里取出并执行
    bucket.forEach((fn) => fn())
    return true
  },
})

// 执行副作用函数，触发读取
effect(() => {
  console.log('effect run')
  document.body.innerHTML = obj.text
})

// setTimeout(() => {
//   obj.text = 'hello world'
// }, 1000)

// 问题：给响应式数据 obj 上设置一个不存在的属性时 effect 函数会触发。正常情况，没有修改 obj.text 属性，effect 函数不应该被触发。
// 测试代码
setTimeout(() => {
  obj.notExist = 'hello vue3'
}, 1000)

// 原因分析： bucket 是 Set 结构，当设置 obj.notExist 时，触发 obj.notExist 的 setter 函数，遍历了整个 bucket 导致 effect 函数被执行了两次
