class Subject {
  constructor() {
    this._observers = [] // 这里存储的是函数，而非对象
  }

  // 订阅方法接受一个函数而非对象
  subscribe(observerFunction) {
    this._observers.push(observerFunction)
    return {
      unsubscribe: () => {
        this._observers = this._observers.filter(
          (fn) => fn !== observerFunction
        )
      },
    }
  }

  // 发布方法，调用每个观察者函数，传递所需的值
  next(value) {
    this._observers.forEach((observerFunction) => {
      observerFunction(value)
    })
  }

  // 取消所有订阅
  unsubscribe() {
    this._observers = []
  }
}
const subject = new Subject()

// 订阅事件
const subscription1 = subject.subscribe((value) => {
  console.log(`Observer 1: ${value}`)
})
const subscription2 = subject.subscribe((value) => {
  console.log(`Observer 2: ${value}`)
})

// 触发事件
subject.next("Hello!") // 输出: Observer 1: Hello! 和 Observer 2: Hello!

// 取消订阅
subscription1.unsubscribe()

// 再次触发事件
subject.next("World!") // 输出: Observer 2: World!
