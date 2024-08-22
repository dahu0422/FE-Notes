class Dep {
  constructor() {
    this.subs = [] // 存储观察者
  }

  // 添加观察者
  addSub(sub) {
    if (sub && sub.update) {
      this.subs.push(sub)
    }
  }

  // 发送通知
  notify() {
    console.log(this.subs)
    this.subs.forEach((sub) => {
      sub.update()
    })
  }
}
