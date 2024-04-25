class EventEmitter {
  constructor() {
    this.events = {} // 存储事件/回调键值对
  }

  // 订阅指定的名字的事件
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [] // 为新事件初始化一个监听数组
    }
    this.events[eventName].push(callback)
  }

  // 发布指定的名字的事件，触发所有订阅者的回调
  emit(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((callback) => {
        callback(...args)
      })
    }
  }

  // 移除某个事件的一个订阅者
  off(eventName, callback) {
    if (!this.events[eventName]) {
      return
    }
    this.events[eventName] = this.events[eventName].filter(
      (cb) => cb !== callback
    )
  }
}

// 使用示例:
const eventEmitter = new EventEmitter()

// 订阅hello事件
eventEmitter.on("hello", (name) => {
  console.log(`Hello ${name}`)
})

// 发布hello事件
eventEmitter.emit("hello", "World") // 输出: Hello World

// 移除hello事件的订阅者
const callBack = (name) => {
  console.log(`Hello again, ${name}`)
}
eventEmitter.on("hello", callBack)
eventEmitter.off("hello", callBack)

// 再次发布hello事件，只有一个订阅者
eventEmitter.emit("hello", "JavaScript") // 输出: Hello JavaScript
