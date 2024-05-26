class EventEmit {
  constructor() {
    this._observers = {}
  }

  on(type, fn) {
    if (!this._observers[type]) {
      this._observers[type] = []
    }
    this._observers[type].push(fn)
  }

  emit(type, ...args) {
    if (this._observers[type]) {
      this._observers[type].forEach((fn) => fn(...args))
    }
  }

  off(type, fn) {
    if (this._observers[type]) {
      this._observers[type] = this._observers[type].filter((f) => f !== fn)
    }
  }
}

const test = (val) => console.log(val)
const ee = new EventEmit()
ee.on("hello", test)

ee.emit("hello", "world")
