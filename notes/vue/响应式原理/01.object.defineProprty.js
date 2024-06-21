const data = {
  name: 'dahu',
  age: 25,
}

function reactive(target, key, value) {
  Object.defineProperty(target, key, {
    get() {
      console.log(`访问${key}属性`)
      return value
    },
    set(val) {
      console.log(`设置${key}属性`)
      value = val
    },
  })
}

Object.keys(data).forEach((key) => reactive(data, key, data[key]))

console.log(data.name)
data.name = 'zhangyi'

data.hobby = 'basketball'
console.log(data.hobby)
// 增加新属性没有触发get、set函数。vue2的弊端，要通过vue.$set()来设置。
