class Subject {
  constructor() {
    this._listeners = []
  }

  // 订阅
  subscribe(listener) {
    this._listeners.push(listener)
  }

  // 发布
  publish(val) {
    this._listeners.forEach((fn) => fn(val))
  }
  // 清空
  clear() {
    this._listeners = []
  }
}

const sub = new Subject()
const test = (val) => console.log(val)

sub.subscribe(test)

sub.publish(123)
