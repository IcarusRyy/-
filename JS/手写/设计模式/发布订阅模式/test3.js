class EventEmitter {
  constructor() {
    this.listener = {}
  }

  // 注册
  on(type, fn) {
    if (!this.listener[type]) {
      this.listener[type] = []
    }
    this.listener[type].push(fn)
  }
  // 发射
  emit(type, ...args) {
    if (this.listener[type]) {
      this.listener[type].forEach((fn) => fn(...args))
    }
  }
  // 取消
  off(type, fn) {
    if (!this.listener[type]) return
    this.listener[type] = this.listener[type].filter((f) => f !== fn)
  }
}

const ee = new EventEmitter()

const test = (val) => console.log("1", val)

ee.on("hello", test)
ee.off("hello", test)
ee.emit("hello", "test")
