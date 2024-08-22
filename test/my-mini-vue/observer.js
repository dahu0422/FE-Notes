// Observer 功能
// - 负责把 data 选项中的属性转换成响应式数据。data 中的某个属性也是对象，把该属性转换成响应式数据。
// - 数据变化发送通知；
class Observer {
  constructor(data) {
    this.walk(data)
  }

  /**
   * 遍历 data 中的属性
   * @param {object} data
   */
  walk(data) {
    if (!data || typeof data !== 'object') return
    Object.keys(data).forEach((key) => {
      this.defineReactive(data, key, data[key])
    })
  }

  /**
   * 将 data 中的属性转换成响应式数据
   * @param {object} obj 对象
   * @param {string} key 属性
   * @param {any} val 值，传递第三个参数避免死递归
   */
  defineReactive(obj, key, val) {
    const _that = this
    let dep = new Dep()
    this.walk(val) // 如果 val 是对象，调用 walk 方法转为响应式对象
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        // 收集依赖
        Dep.target && dep.addSub(Dep.target)
        return val
      },
      set(newValue) {
        if (newValue === val) return
        val = newValue
        _that.walk(newValue)
        // 发送通知
        dep.notify()
      },
    })
  }
}
