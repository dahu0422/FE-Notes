# 防抖函数
防抖函数使用场景：对于频繁耗时操作，只关心最后一次的触发结果。

```javascript
/**
 * 函数防抖，在一定时间内频繁触发事件，仅执行最后一次
 * @param {Function} fn 要执行的函数
 * @param {Number} duration 延迟时间
 * @return {Function} 最后一次执行的函数
 */
function debounce(fn, duration) {
  let timer = null
  return function(...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, duration)
  }
}
```

参考：
[渡一函数防抖](https://www.bilibili.com/video/BV1734y1K7Xz/?spm_id_from=333.999.0.0&vd_source=dce7b1ab94acfc972ab20009a0109fd3)
