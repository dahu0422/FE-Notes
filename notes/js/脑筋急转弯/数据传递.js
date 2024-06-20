// 改变行参是不会引起外部的变化的
function increase(val) {
  val++
}
let a = 1
increase(a)
increase(a)
console.log(a)

function increase2(obj) {
  obj = { a: 2 }
}
let obj = { a: 1 }
increase2(obj)
console.log(obj)

// ------------- 指向同一内存空间会改变
function increase3(obj) {
  obj.a += 1
}
increase3(obj)
console.log(obj)
