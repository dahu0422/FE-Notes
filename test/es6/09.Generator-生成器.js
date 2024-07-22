// 基本使用
function* foo() {
  console.log('zce')
  return 100
}
const res = foo()
console.log(foo().next())

function* myGenerator() {
  yield 1 // 第一次调用.next()时返回的值
  yield 2 // 第二次调用.next()时返回的值
  yield 3 // 第三次调用.next()时返回的值
}
