const PROMISE_STATE = {
  PENDING: 0,
  FULFILLED: 1,
  REJECTED: 2,
}

class MyPromise {
  #result // 保存结果
  #state = PROMISE_STATE.PENDING // 初始状态为pending

  #handler = [] // 保存回调函数
  constructor(executor) {
    const resolve = (data) => {
      this.#changeState(PROMISE_STATE.FULFILLED, data)
    }
    const reject = (reason) => {
      this.#changeState(PROMISE_STATE.REJECTED, reason)
    }
    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }
  #isPromise(value) {
    // 需要满足promiseA+规范，只要满足那就是一个promise
    // 只要有then属性，并且是函数或者是对象，那就是一个promise
    if (
      value !== null &&
      (typeof value === "object" || typeof value === "function")
    ) {
      return typeof value.then === "function"
    } else {
      return false
    }
  }
  #runMicroTask(func) {
    // 区分环境
    // 如果在node环境中
    if (typeof process === "object" && process.nextTick) {
      process.nextTick(func)
    } else if (typeof queueMicrotask === "function") {
      queueMicrotask(func)
    } else {
      Promise.resolve().then(func)
    }
  }

  #runOne(callback, resolve, reject) {
    this.#runMicroTask(() => {
      if (typeof callback !== "function") {
        const settled =
          this.#state === PROMISE_STATE.FULFILLED ? resolve : reject
        settled(this.#result)
        return
      } else {
        try {
          const data = callback(this.#result)
          if (this.#isPromise(data)) {
            data.then(resolve, reject)
          } else {
            resolve(data)
          }
        } catch (err) {
          reject(err)
        }
      }
    })
  }
  #run() {
    if (this.#state === PROMISE_STATE.PENDING) return
    while (this.#handler.length) {
      const { onFulfilled, onRejected, resolve, reject } = this.#handler.shift()
      if (this.#state === PROMISE_STATE.FULFILLED) {
        this.#runOne(onFulfilled, resolve, reject)
      } else {
        this.#runOne(onRejected, resolve, reject)
      }
    }
  }
  #changeState(state, result) {
    if (this.#state !== PROMISE_STATE.PENDING) return
    this.#state = state
    this.#result = result
    this.#run()
  }
  // then 传入的两个回调 什么时候运行
  // then 方法返回一个promise 这个promise 什么时候完成 什么时候失败
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#handler.push({
        onFulfilled,
        onRejected,
        resolve,
        reject,
      })
      this.#run()
    })
  }
}

// const p = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve("成功")
//     reject("失败")
//   }, 1000)
// })
// p.then(null, (err) => {
//   console.log("失败完成1", err)
//   return 456
// }).then(
//   (data) => {
//     console.log("成功完成2", data)
//   },
//   (err) => {
//     console.log("失败完成2", err)
//   }
// )

setTimeout(() => {
  console.log(1)
}, 0)

new MyPromise((resolve) => {
  resolve(2)
}).then((data) => console.log(data))

console.log(3)
