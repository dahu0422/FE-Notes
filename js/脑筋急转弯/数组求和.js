// 不使用标准库函数对数组求和
const nums = [1, 2]

function addSum(arr) {
  function fn(i) {
    return i >= arr.length ? 0 : arr[i] + fn(i + 1)
  }
  return fn(0)
}

console.log(addSum(nums))
