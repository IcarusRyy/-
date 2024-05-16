class EventEmitter {
  constructor() {
    this._observers = {}
  }

  // 订阅
  on(type, fn) {
    if (!this._observers[type]) {
      this._observers[type] = []
    }
    this._observers[type].push(fn)
  }
  // 发布
  emit(type, ...args) {
    if (!this._observers[type]) return
    this._observers[type].forEach((fn) => fn(...args))
  }
  // 取消
  off(type, fn) {
    if (!this._observers[type]) return
    this._observers[type] = this._observers[type].filter((f) => f !== fn)
  }
}

const test = (val) => console.log(val)

const ee = new EventEmitter()

ee.on("hello", test)
ee.off("hello", test)
ee.emit("hello", "world")
