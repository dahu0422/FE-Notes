const obj = {
  true: 'value',
  123: 'value',
  [{ a: 1 }]: 'value',
}
console.log(Object.keys(obj)) // [ 'true', '123', '[object Object]' ]

const map = new Map()
map.set(true, 'value')
map.set(123, 'value')
map.set([{ a: 1 }], 'value')
console.log(map.keys()) // [Map Iterator] { true, 123, [ { a: 1 } ] }
