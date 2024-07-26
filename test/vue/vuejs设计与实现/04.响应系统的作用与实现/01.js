// 目标：拦截读取操作，在读取操作时将副作用函数 effect 添加到存储副作用函数的桶中

// 原始数据
const data = {
  text: 'hello world',
}
// 存储副作用函数
const bucket = new Set()
const obj = new Proxy(data, {
  // 拦截读取操作
  get(target, key) {
    // 将副作用函数 effect 添加到 bucket 中
    bucket.add(effect)
    return target[key]
  },
  set(target, key, value) {
    target[key] = value
    // 把副作用函数从桶里取出并执行
    bucket.forEach((fn) => fn())
    return true
  },
})

function effect() {
  document.body.innerHTML = obj.text
}
// 执行副作用函数，触发读取
effect()

setTimeout(() => {
  obj.text = 'hello world'
}, 1000)

// 问题：effect 副作用函数是硬编码的，如果换了一个函数名称就无法捕获。
