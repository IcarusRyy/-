class EventEmitter {
  constructor() {
    this._observer = {}
  }

  // 订阅
  on(type, fn) {
    if (!this._observer[type]) {
      this._observer[type] = []
    }
    this._observer[type].push(fn)
  }
  // 发布
  emit(type, ...args) {
    if (!this._observer[type]) return
    this._observer[type].forEach((fn) => fn(...args))
  }
  // 取消
  off(type, fn) {
    if (!this._observer[type]) return
    this._observer[type] = this._observer[type].filter((f) => f !== fn)
  }
}

const ee = new EventEmitter()
const test = (val) => console.log(val, "val")

ee.on("hello", test)
ee.off("hello", test)
ee.emit("hello", "word")
