class EventEmitter {
  constructor() {
    this.listener = {}
  }

  on(type, fn) {
    if (!this.listener[type]) {
      this.listener[type] = []
    }
    this.listener[type].push(fn)
  }

  emit(type, ...args) {
    if (!this.listener[type]) return
    this.listener[type].forEach((fn) => fn(...args))
  }

  off(type, fn) {
    if (!this.listener[type]) return
    this.listener[type] = this.listener[type].filter((f) => f !== fn)
  }
}

const test = (val) => console.log(val)

const ee = new EventEmitter()
ee.on("hello", test)
ee.emit("hello", "world")
