class Scheduler {
  constructor(max = 2) {
    this.runningTasks = []
    this.waitTasks = []
    this.max = max
  }

  add(task) {
    if (this.runningTasks.length < this.max) {
      this.run(task)
    } else {
      this.waitTasks.push(task)
    }
  }

  run(task) {
    const promise = task()
    this.runningTasks.push(promise)
    promise.then(() => {
      this.removeTask(promise)
      if (this.waitTasks.length > 0) {
        this.add(this.waitTasks.shift())
      }
    })
  }

  removeTask(promise) {
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
