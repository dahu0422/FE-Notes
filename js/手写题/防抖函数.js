// 什么是防抖函数？
// 防抖函数是一种策略，用于限制函数的执行频率。用于频繁触发事件中，例如窗口滚动、尺寸变化、鼠标移动事件.
// 核心思想：一个函数在规定时间内连续触发，只有最后一次触发才真正执行。
/**
 * @param {Function} fn
 * @param {Number} delay
 * @return {Function}
 */
function debounce(fn, delay) {
  let timerId = null
  return function (...args) {
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      fn.apply(this, args) // this指向问题，如果有疑惑看下面过程👇
    }, delay)
  }
}

const func = debounce(() => {
  console.log('debounce')
}, 1000)
func()
func()
func()

// 第一版我写完是这样子的，我感觉到这里的this可能会改变
// function debounce(fn, delay) {
//   let timerId = null
//   return function () {
//     clearTimeout(timerId)
//     timerId = setTimeout(fn, delay)
//   }
// }
// 箭头函数作为fn，没有this
// const funcV1 = debounce(() => {
//   console.log(this)
//   console.log('debounce')
// }, 1000)

// 普通函数作为fn，this指向了timeout
// const funcV1 = debounce(function () {
//   console.log(this)
//   console.log('debounce')
// })

// funcV1()
// funcV1()
// funcV1()

// tag：闭包
