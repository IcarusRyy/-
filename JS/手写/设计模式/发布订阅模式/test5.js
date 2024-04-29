class EventEmitter {
  constructor() {
    this._listeners = {}
  }
  // 订阅
  on(type, fn) {
    if (!this._listeners[type]) {
      this._listeners[type] = []
    }
    this._listeners[type].push(fn)
  }
  // 发布
  emit(type, ...args) {
    if (this._listeners[type]) {
      this._listeners[type].forEach((fn) => fn(...args))
    }
  }
  // 取消
  off(type, fn) {
    if (!this._listeners[type]) return
    this._listeners = this._listeners[type].filter((f) => f !== fn)
  }
}

const ee = new EventEmitter()
const test = (val) => console.log(val)

ee.on("hello", test)
ee.off("hello", test)
ee.emit("hello", "world")
