/**
 * 防抖函数：在给定时间内只执行一次，如果在给定时间内再次触发，则重新计时。
 * @param {Function} fn 需要防抖的函数
 * @param {number} duration 防抖时间
 * @returns {Function} 防抖后的函数
 */
function debounce(fn, duration) {
  let timer = null
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, ...args)
    }, duration)
  }
}
