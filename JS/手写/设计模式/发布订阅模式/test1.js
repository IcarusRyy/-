class EventEmitter {
  constructor() {
    this.listener = {}
  }

  // 注册
  on(type, cb) {
    if (!this.listener[type]) {
      this.listener[type] = []
    }
    this.listener[type].push(cb)
  }

  // 发射
  emit(type, ...args) {
    if (this.listener[type]) {
      this.listener[type].forEach((fn) => fn(...args))
    }
  }
  // 取消
  off(type, cb) {
    if (!this.listener[type]) return
    this.listener[type] = this.listener[type].filter((fn) => fn !== cb)
  }
}

const ee = new EventEmitter()

const test = (val) => console.log("hello", val)

ee.on("hello", test)

ee.emit("hello", "小明")
// ee.off("hello", test)
ee.emit("hello", "小李")
