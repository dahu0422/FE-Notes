const todos = {
  life: ['吃饭', '睡觉', '打豆豆'],
  work: ['喝咖啡', '写代码', '休息'],

  each: function (callback) {
    const all = [...this.life, ...this.work]
    for (const item of all) {
      callback(item)
    }
  },

  [Symbol.iterator]: function () {
    const all = [...this.life, ...this.work]
    let index = 0
    return {
      next: () => ({
        value: all[index++],
        done: index >= all.length,
      }),
    }
  },
}

todos.each((item) => console.log(item))
for (const item of todos) {
  console.log(item)
}
