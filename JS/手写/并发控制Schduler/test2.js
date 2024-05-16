class Scheduler {
  constructor(max = 2) {
    this.runningTask = []
    this.waitingTask = []
    this.max = max
  }
  add(task) {
    if (this.runningTask.length >= this.max) {
      this.waitingTask.push(task)
    } else {
      this.run(task)
    }
  }

  run(task) {
    const promise = task()
    this.runningTask.push(promise)
    promise.then(() => {
      this.removeTask(promise)
      if (this.waitingTask.length) {
        this.run(this.waitingTask.shift())
      }
    })
  }
  removeTask(promise) {
    const index = this.runningTask.indexOf(promise)
    if (index > -1) {
      this.runningTask.splice(index, 1)
    }
  }
}

const test = (val, delay) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(val, "val")
      resolve(val)
    }, delay)
  })
}

const scheduler = new Scheduler()

const addTask = (val, delay) => {
  scheduler.add(() => test(val, delay))
}
addTask("1", 1000)
addTask("2", 500)
addTask("3", 300)
addTask("4", 400)
// output：2 3 1 4
