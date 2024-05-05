const PROMISE_STATE = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
}

class MyPromise {
  #state = PROMISE_STATE.PENDING
  #result = undefined
  #handler = []
  constructor(executor) {
    let resolve = (data) => this.#changeState(data, PROMISE_STATE.FULFILLED)
    let reject = (rea) => this.#changeState(rea, PROMISE_STATE.REJECTED)
    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }
  #changeState(data, state) {
    this.#result = data
    this.#state = state
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
        const result = callback(this.#result)
        if (this.#isPromise(result)) {
          result.then(resolve, reject)
        } else {
          resolve(result)
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

const p = new MyPromise((resolve, reject) => {
  // resolve(1)
  reject(2)
})
p.then(
  (data) => console.log("成功", data),
  (rea) => console.log("失败", rea)
)
