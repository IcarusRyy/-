const PROMISE_STATE = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
}

class MyPromise {
  #statue = PROMISE_STATE.PENDING
  #result

  // 存放回调, 记录到数组主要是因为then可以连续调用
  #handler = []

  #changeState = (data, statue) => {
    if (this.#statue !== PROMISE_STATE.PENDING) return

    this.#statue = statue
    this.#result = data

    // 执行未来时刻改变的promise
    this.#run()
  }
  constructor(executor) {
    const resolve = (data) => {
      this.#changeState(data, PROMISE_STATE.FULFILLED)
    }
    const reject = (rea) => {
      this.#changeState(rea, PROMISE_STATE.REJECTED)
    }

    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  // 判断是否符合promiseA+规范
  #isPromise(value) {
    if (
      value !== null &&
      (typeof value === "object" || typeof value === "function")
    ) {
      return typeof value.then === "function"
    } else {
      return false
    }
  }

  #runMicroTask(fun) {
    // 区分环境
    // 如果在node环境
    if (typeof process === "object" && typeof process.nextTick === "function") {
      process.nextTick(fun)
    } else if (typeof queueMicrotask === "function") {
      queueMicrotask(fun)
    } else {
      Promise.resolve().then(fun)
    }
  }

  // callback 是 then的回调
  // 这里的执行是需要放到微队列里去执行
  #runOne(callback, resolve, reject) {
    this.#runMicroTask(() => {
      if (typeof callback !== "function") {
        const settled =
          this.#statue === PROMISE_STATE.FULFILLED ? resolve : reject
        settled(this.#result)
        return
      } else {
        try {
          const data = callback(this.#result)
          // 这里要判断返回结果是不是一个promise
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
    // this指向当前的promise，也就是new创建的promise
    // 如果当前promise还是挂起状态 则不执行
    if (this.#statue === PROMISE_STATE.PENDING) return
    while (this.#handler.length) {
      const { onFulfilled, onRejected, resolve, reject } = this.#handler.shift()
      // 如果当前的promise是已经完成的状态，则调用onFulfilled回调，并将完成的数据传递给回调
      if (this.#statue === PROMISE_STATE.FULFILLED) {
        this.#runOne(onFulfilled, resolve, reject)
        // if (typeof onFulfilled !== "function") {
        //   try {
        //     const data = onFulfilled(this.#result)
        //     resolve(data)
        //   } catch (err) {
        //     reject(err)
        //   }
        // } else {
        //   resolve(this.#result)
        // }
      } else {
        this.#runOne(onRejected, resolve, reject)
        // if (typeof onRejected !== "function") {
        //   try {
        //     const res = onRejected(this.#result)
        //     reject(res)
        //   } catch (err) {
        //     reject(err)
        //   }
        // } else {
        //   reject(this.#result)
        // }
      }
    }
  }
  // 什么时候调用onFulfilled 和 onRejected
  // 对应3种情况
  // 1、当前promise 挂起 啥也不做
  // 2、当前promise 完成 执行onFulfilled
  // 3、当前promise 失败 执行onRejected
  // 什么时候调用resolve和reject
  // 对应3种情况
  // 1、resolve或者reject不是函数 则直接调用当前实例的resolve或者reject，也就是promise穿透
  // 2、resolve或者reject是函数 则执行这个函数，并且将返回值传递给下一个then的onFulfilled或者onRejected
  // 3、回调结果是一个promise
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

const p = new MyPromise((resolve, reject) => {
  resolve(123)
})
p.then(
  (data) => {
    console.log(data)
  },
  (err) => {
    console.log(err)
  }
)
