class Vue {
  constructor(options) {
    // 负责接受初始化的参数（options）
    this.$options = options || {}
    this.$data = options.data || {}

    this.$el =
      typeof options.el === 'string'
        ? document.querySelector(options.el)
        : options.el
    // 负责把 data 中的属性注入到 Vue 实例，转换为 getter/setter
    this._proxyData(this.$data)
    // 负责调用 Observer 监听 data 中所有属性的变化
    new Observer(this.$data)
    // 负责调用 complier 解析指令/差值表达式
    new Compiler(this)
  }

  // 遍历 data 中的所有属性，把 data 中的属性注入到 vue 实例中
  _proxyData(data) {
    Object.keys(data).forEach((key) => {
      Object.defineProperty(this, key, {
        enumerable: true, // 可枚举
        configurable: true, // 可配置
        get() {
          debugger
          return data[key]
        },
        set(newValue) {
          if (data[key] === newValue) return
          data[key] = newValue
          return true
        },
      })
    })
  }
}
