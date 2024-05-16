class Scheduler {
  constructor(max = 2) {
    this.runningTask = []
    this.waitingTasks = []
    this.max = max
  }

  add(task) {
    if (this.runningTask.length >= this.max) {
      this.waitingTasks.push(task)
    } else {
      this.run(task)
    }
  }

  run(task) {
    const promise = task()
    this.runningTask.push(promise)
    promise.then(() => {
      // 移除完成的任务
      this.removeTask(promise)
      if (this.waitingTasks.length > 0) {
        // 调用下一个任务
        this.run(this.waitingTasks.shift())
      }
    })
  }
  // 移除在runningTasks中的promise
  removeTask(promise) {
    const index = this.runningTask.indexOf(promise)
    if (index > -1) {
      this.runningTask.splice(index, 1)
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
