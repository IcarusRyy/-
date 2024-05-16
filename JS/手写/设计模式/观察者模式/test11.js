class Subject {
  constructor() {
    this._listeners = []
  }

  // 订阅
  subscribe(fn) {
    this._listeners.push(fn)
  }
  // 发布
  publish(val) {
    this._listeners.forEach((fn) => fn(val))
  }
  // 清空
  clear(fn) {
    this._listeners = []
  }
}

const sub = new Subject()

const test = (val) => console.log(val)
sub.subscribe(test)
sub.publish("hello")
