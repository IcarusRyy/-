class Subject {
  constructor() {
    this._listener = []
  }

  // 订阅
  subscribe(listener) {
    this._listener.push(listener)
  }

  // 发布
  publish(val) {
    this._listener.forEach((fn) => fn(val))
  }
  // 清空
  clear() {
    this._listener = []
  }
}

const sub = new Subject()

const test = (val) => console.log(val)

sub.subscribe(test)

sub.publish(123)
