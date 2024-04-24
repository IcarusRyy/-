class Subject {
  constructor() {
    this._observers = []
  }

  // 订阅
  subscribe(observer) {
    this._observers.push(observer)
    return {
      unSubscribe: () =>
        (this._observers = this._observers.filter((item) => item !== observer)),
    }
  }
  // 发布
  publish(val) {
    this._observers.forEach((observer) => observer(val))
  }

  // 清空
  unSubscribeAll() {
    this._observers = []
  }
}

const subject = new Subject()
subject.subscribe((val) => console.log("1", val))
subject.subscribe((val) => console.log("2", val))
const subject3 = subject.subscribe((val) => console.log("3", val))
subject3.unSubscribe()
subject.publish("hello")
