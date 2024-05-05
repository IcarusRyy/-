class EventEmitter {
  constructor() {
    this._listener = {}
  }
  // 订阅
  on(type, fn) {
    if (!this._listener[type]) {
      this._listener[type] = []
    }
    this._listener[type].push(fn)
  }
  // 发布
  emit(type, val) {
    if (this._listener[type]) {
      this._listener[type].forEach((fn) => fn(val))
    }
  }
  // 取消
  off(type, fn) {
    if (!this._listener[type]) return
    this._listener[type] = this._listener[type].filter((f) => f !== fn)
  }
}

const test = (val) => console.log(val)

const ee = new EventEmitter()
ee.on("hello", test)

ee.off("hello", test)
ee.emit("hello", "world")
