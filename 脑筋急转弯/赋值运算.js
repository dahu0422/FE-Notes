let a = { n: 1 }
let b = a

a.x = a = { n: 2 }
console.log(a.x) // undefined
console.log(b.x) // { n: 2 }

// a.x的创建是在a = { n: 2 }赋值之后，在打印的时候a中没有x属性
