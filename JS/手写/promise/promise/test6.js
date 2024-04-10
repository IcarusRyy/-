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
  #changeState(data, state) {
    this.#result = data
    this.#state = state
    this.#run()
  }

  #isPromise(val) {
    if (val && (typeof val === "object" || typeof val === "function")) {
      return typeof val.then === "function"
    }
    return false
  }

  #runMicroTask(fn) {
    if (typeof queueMicrotask === "function") {
      queueMicrotask(fn)
    } else {
      Promise.resolve().then(fn)
    }
  }

  #runOne(callback, resolve, reject) {
    this.#runMicroTask(() => {
      if (typeof callback !== "function") {
        const settled =
          this.#state === PROMISE_STATE.FULFILLED ? resolve : reject
        settled(this.#result)
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
    while (this.#handler.length) {
      const { onFulfilled, onRejected, resolve, reject } = this.#handler.shift()
      if (this.#state === PROMISE_STATE.FULFILLED) {
        this.#runOne(onFulfilled, resolve, reject)
      } else {
        this.#runOne(onRejected, resolve, reject)
      }
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
  (data) => {
    console.log("成功完成：", data)
  },
  (rea) => {
    console.log("失败完成：", rea)
  }
)
