class Scheduler {
  constructor(max = 2) {
    this.runningTasks = []
    this.waitingTasks = []
    this.max = max
  }

  add(task) {
    if (this.runningTasks.length < this.max) {
      this.run(task)
    } else {
      this.waitingTasks.push(task)
    }
  }
  run(task) {
    const promise = task()
    this.runningTasks.push(promise)
    promise.then(() => {
      this.removeTask(promise)
      if (this.waitingTasks.length > 0) {
        this.run(this.waitingTasks.shift())
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

const test = (val, wait) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(val)
      resolve(val)
    }, wait)
  })
}

const scheduler = new Scheduler()
const addTask = (val, wait) => {
  scheduler.add(() => test(val, wait))
}

addTask("1", 1000)
addTask("2", 500)
addTask("3", 300)
addTask("4", 400)
// output：2 3 1 4
