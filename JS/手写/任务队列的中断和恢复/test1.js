function processTasks(...tasks) {
  let isRunning = false
  let result = []
  let i = 0

  return {
    start() {
      return new Promise(async (resolve, reject) => {
        if (isRunning) {
          return reject("任务正在执行中")
        }
        isRunning = true
        while (i < tasks.length) {
          try {
            const res = await tasks[i]()
            console.log(res, "res")
            result[i] = res
            i++
            if (!isRunning) {
              return
            }
          } catch (err) {
            isRunning = false
            return reject(err)
          }
        }
        isRunning = false
        resolve(result)
      })
    },
    pause() {
      isRunning = false
    },
    reset() {
      isRunning = false
      i = 0
      result.length = 0
    },
  }
}

// 示例任务函数
const task1 = () =>
  new Promise((resolve) => setTimeout(() => resolve("Task 1 completed"), 1000))
const task2 = () =>
  new Promise((resolve) => setTimeout(() => resolve("Task 2 completed"), 1000))
const task3 = () =>
  new Promise((resolve) => setTimeout(() => resolve("Task 3 completed"), 1000))

const taskProcessor = processTasks(task1, task2, task3)

taskProcessor
  .start()
  .then((result) => console.log(result, "1"))
  .catch((err) => console.error(err))

// 停止任务的例子
setTimeout(() => {
  taskProcessor.pause()
  console.log("Tasks paused")
}, 1500)

// 重新开始任务
setTimeout(() => {
  taskProcessor
    .start()
    .then((result) => console.log(result, "2"))
    .catch((err) => console.error(err))
}, 3000)
