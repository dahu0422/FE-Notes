let arr: [string, number] = ['a', 1]

let x: [string, number?, boolean?]
x = ['hello', 10] // 正确
x = ['hello'] // 正确
x = ['hello', 10, true] // 正确
x = ['hello', , true] // 错误，因为 true 应该放在 10 的位置
