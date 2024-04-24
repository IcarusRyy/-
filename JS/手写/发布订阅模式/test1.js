class Subject {
  constructor() {
    this._observers = []
  }

  // 订阅
  subscribe(observer) {
    this._observers.push(observer)
    return {
      unSubscribe: () => this._observers.filter((fn) => fn !== observer),
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

subject.publish("hello")
subject.unSubscribeAll()
subject.publish("hello123")
