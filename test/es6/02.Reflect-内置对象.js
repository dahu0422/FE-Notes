const obj = {
  name: 'dahu',
  age: 18,
  height: 1.88,
}

// 以前的写法：要用到操作符、object的方法
console.log('name' in obj)
console.log(delete obj.age)
console.log(Object.keys(obj))

// MDN 主推 Reflect
console.log(Reflect.has(obj, 'name'))
console.log(Reflect.deleteProperty(obj, 'age'))
console.log(Reflect.ownKeys(obj))
