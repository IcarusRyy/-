class Subject {
  constructor() {
    this._listeners = []
  }

  // 订阅
  subscribe(fn) {
    this._listeners.push(fn)
  }
  // 发布
  publish(data) {
    this._listeners.forEach((f) => f(data))
  }
  // 清空
  clear() {
    this._listeners = []
  }
}

const test = (val) => console.log(val, "val")

const sub = new Subject()

sub.subscribe(test)
sub.publish("hello")
