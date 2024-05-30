class EventEmitter {
  constructor() {
    this.listeners = {}
  }

  // 注册
  on(type, fn) {
    if (!this.listeners[type]) {
      this.listeners[type] = []
    }
    this.listeners[type].push(fn)
  }
  // 发射
  emit(type, ...args) {
    if (!this.listeners[type]) return
    this.listeners[type].forEach((fn) => fn(...args))
  }
  // 取消
  off(type, fn) {
    if (!this.listeners[type]) return
    this.listeners = this.listeners[type].filter((f) => f !== fn)
  }
}

const ee = new EventEmitter()

const test = (val) => console.log("1", val)

ee.on("hello", test)

// ee.emit("hello", "world")
ee.off("hello", test)
ee.emit("hello", "world")
