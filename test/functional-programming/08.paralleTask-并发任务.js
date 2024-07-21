/**
 * 并发队列
 * @param {Array} tasks 需要并发执行的任务列表
 * @param {number} paralleCount 并发数
 * @returns {Promise} 返回一个 Promise，resolve 时返回结果列表
 */
function paralleTask(tasks, paralleCount = 4) {
  return new Promise((resolve, reject) => {
    let results = [] // 存储结果
    let taskIndex = 0 // 当前任务索引
    let runningTasks = 0 // 当前正在执行的任务数

    for (let i = 0; i < Math.min(tasks.length, paralleCount); i++) {
      _run()
    }

    function _run() {
      // 如果还有任务，则继续执行
      if (taskIndex < tasks.length && runningTasks < paralleCount) {
        runningTasks += 1
        const task = tasks[taskIndex]
        taskIndex += 1

        task()
          .then((result) => {
            runningTasks -= 1
            results.push(result)
            _run()
          })
          .catch((error) => {
            runningTasks -= 1
            console.log(error)
            _run()
          })
          .finally(() => {
            // 如果没有任务了，则返回结果
            if (runningTasks === 0 && taskIndex === tasks.length) {
              resolve(results)
            }
          })
      }
    }
  })
}

console.log('放入 html 文件测试')
// const tasks = []
// for (let i = 0; i < 100; i++) {
//   const req = () => fetch(`https://jsonplaceholder.typicode.com/todos/${i}`)
//   tasks.push(req)
// }
// paralleTask(tasks, 4).then((res) => {
//   console.log(res)
// })
