class Scheduler {
  constructor() {
    this.runningTasks = []
    this.waitingTasks = []
    this.max = 2
  }

  add(promiseMaker) {
    if (this.runningTasks.length >= this.max) {
      this.waitingTasks.push(promiseMaker)
    } else {
      this.run(promiseMaker)
    }
  }

  run(promiseMaker) {
    const promise = promiseMaker()
    this.runningTasks.push(promise)

    promise.then(() => {
      // 移除已经完成的任务
      this.removeRunningTask(promise)

      if (this.waitingTasks.length) {
        // 调用下一个等待中的任务
        this.run(this.waitingTasks.shift())
      }
    })
  }

  // 移除在 runningTasks 中的 promise
  removeRunningTask(promise) {
    const index = this.runningTasks.indexOf(promise)
    if (index > -1) {
      this.runningTasks.splice(index, 1)
    }
  }
}
const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time)
  })
const scheduler = new Scheduler()
const addTask = (time, order) => {
  scheduler.add(() => timeout(time).then(() => console.log(order)))
}
addTask(1000, "1")
addTask(500, "2")
addTask(300, "3")
addTask(400, "4")
// output：2 3 1 4
