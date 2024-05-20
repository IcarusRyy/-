class EventEmitter {
  constructor() {
    this._observer = {}
  }

  on(type, fn) {
    if (!this._observer[type]) {
      this._observer[type] = []
    }
    this._observer[type].push(fn)
  }

  emit(type, ...args) {
    if (!this._observer[type]) return
    this._observer[type].forEach((fn) => fn(...args))
  }

  off(type, fn) {
    if (!this._observer[type]) return
    this._observer[type] = this._observer[type].filters((f) => f !== fn)
  }
}

const test = (val) => console.log(val)
const ee = new EventEmitter()
ee.on("hello", test)
ee.emit("hello", "world")
