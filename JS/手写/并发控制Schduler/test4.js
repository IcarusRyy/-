class Scheduler {
  constructor(max = 2) {
    this.runningTask = []
    this.waitingTask = []
    this.max = max
  }

  add(task) {
    if (this.runningTask.length < this.max) {
      this.run(task)
    } else {
      this.waitingTask.push(task)
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
