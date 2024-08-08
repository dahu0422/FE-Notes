// 类型断言

export {}

const nums = [110, 120, 130]

const res = nums.find((i) => i > 100)

const num1 = res as number
console.log(num1)
