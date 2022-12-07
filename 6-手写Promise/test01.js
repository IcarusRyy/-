const PROMISE_STATE = {
  PENDING: 0,
  FULFILLED: 1,
  REJECTED: 2,
}
class MyPromise {
  #result // 保存结果
  #state = PROMISE_STATE.PENDING // 初始状态为pending
  #callbacks = [] // 保存then回调函数
  constructor(executor) {
    // executor函数 其实就是调用MyPromise类传的函数参数
    executor(this.#resolve.bind(this), this.#reject.bind(this))
  }
  // resolve方法
  #resolve(value) {
    this.#result = value
    this.#state = 1
    // 将then方法中的回调函数参数添加到微任务队列 接住 queueMicrotask 方法
    queueMicrotask(() => {
      this.#callbacks.forEach((cb) => {
        cb()
      })
    })
  }
  // reject方法
  #reject(reason) {
    console.log(reason)
  }
  // then方法 接受两个回调函数的参数 onFulfilled onRejected
  then(onFulfilled, onRejected) {
    // then要返回一个promise
    return new MyPromise((resolve, reject) => {
      // 如果状态是pending的话，需要将回调函数加入到微任务队列
      if (this.#state === PROMISE_STATE.PENDING) {
        this.#callbacks.push(() => {
          // 需要onfulfilled的返回值作为resolve的参数 所以在此处直接调用resolve
          resolve(onFulfilled(this.#result))
        })
      } else if (this.#state === PROMISE_STATE.FULFILLED) {
        // then回调函数要放在微任务队列去执行，而不是直接调用
        queueMicrotask(() => {
          resolve(onFulfilled(this.#result))
        })
      }
    })
  }
}
// 异步情况
const mp = new MyPromise((resolve, reject) => {
  // setTimeout(() => {
  //   resolve("孙悟空")
  // }, 1000)
  resolve("孙悟空")
})
mp.then((res) => {
  console.log(res, "then1")
  return "猪八戒"
}).then((res) => {
  console.log(res, "链式调用then")
})
mp.then((res) => {
  console.log(res, "then2")
})
