const data = {
  name: 'dahu',
  age: 18,
}

function reactive(target) {
  const handler = {
    get(target, prop, receiver) {
      console.log(`访问${prop}属性`)
      return Reflect.get(target, prop, receiver)
    },
    set(target, prop, value, receiver) {
      console.log(`设置${prop}属性`)
      Reflect.set(target, prop, value, receiver)
    },
  }
  return new Proxy(target, handler)
}

const proxyData = reactive(data)

console.log(proxyData.name)
proxyData.name = 'zhangyi'

proxyData.hobby = 'basketball'
console.log(proxyData.hobby)
console.log(data.hobby)
