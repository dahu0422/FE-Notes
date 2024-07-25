// - 当数据变化触发依赖，dep通知所有watcher实例更新视图
// - 自身实力化时往dep对象中添加自己
class Watcher {
  /**
   *
   * @param {vue} vm vue实例
   * @param {string} key  属性
   * @param {function} cb 回调函数负责更新视图
   */
  constructor(vm, key, cb) {
    this.vm = vm
    this.key = key
    this.cb = cb
    // 把 watcher 实例记录到Dep类的静态属性target上
    Dep.target = this
    // 触发 get 方法，在 get 方法中调用 addSub
    this.oldValue = vm[key]
    Dep.target = null
  }
  // 当数据发生变化时更新视图
  update() {
    let newValue = this.vm[this.key]
    if (newValue === this.oldValue) return
    this.cb(newValue)
  }
}
