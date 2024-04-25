class Subject {
  constructor() {
    this._observers = []
  }

  // 订阅
  subscribe(fn) {
    this._observers.push(fn)
    return {
      unSubscribe: () => {
        this._observers = this._observers.filter((f) => f !== fn)
      },
    }
  }
  // 发布
  publish(val) {
    this._observers.forEach((fn) => fn(val))
  }

  // 清空
  clear() {
    this._observers = []
  }
}

const subject = new Subject()

subject.subscribe((val) => console.log("1", val))
subject.subscribe((val) => console.log("2", val))

subject.publish("test")
