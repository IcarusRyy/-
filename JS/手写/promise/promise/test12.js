const PROMISE_STATE = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
}

class MyPromise {
  #state = PROMISE_STATE.PENDING
  #result
  #handler = []
  constructor(executor) {
    let resolve = (data) => this.#changeState(data, PROMISE_STATE.FULFILLED)
    let reject = (rea) => this.#changeState(data, PROMISE_STATE.REJECTED)
    try {
      executor(resolve)
    } catch (err) {
      reject(err)
    }
  }
  #changeState(data, state) {
    this.#state = state
    this.#result = data
  }

  #isPromise(val) {
    if (val && (typeof val === "object" || typeof val === "function")) {
      return typeof val.then === "function"
    } else {
      return false
    }
  }
  #runMicroTask(fn) {
    queueMicrotask(fn)
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
          const res = callback(this.#result)
          if (this.#isPromise(res)) {
            res.then(resolve, reject)
          } else {
            resolve(res)
          }
        } catch (rea) {
          reject(rea)
        }
      }
    })
  }

  #run() {
    if (this.#state === PROMISE_STATE.PENDING) return
    const { onFulfilled, onRejected, resolve, reject } = this.#handler.shift()
    if (this.#state === PROMISE_STATE.FULFILLED) {
      this.#runOne(onFulfilled, resolve, reject)
    } else {
      this.#runOne(onRejected, resolve, reject)
    }
  }

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

const p = new Promise((resolve, reject) => {
  // resolve(123)
  reject(456)
})

p.then(
  (data) => console.log("成功", data),
  (rea) => console.log("失败", rea)
)
