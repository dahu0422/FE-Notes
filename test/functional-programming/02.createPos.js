/**
 * 返回次幂的函数
 * @param {number} power 次幂
 * @returns {function}
 */
function createPow(power) {
  return function (num) {
    return Math.pow(num, power)
  }
}

const power2 = createPow(2) // 求平方
console.log(power2(4), power2(5))
