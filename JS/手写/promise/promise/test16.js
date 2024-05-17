const PROMISE_STATE = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
}

class MyPromise {
  #state = PROMISE_STATE.PENDING
  #result = null
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
    this.#state = state
    this.#result = data
    this.#run()
  }
  #isPromise(val) {
    if (val && (typeof val === "function" || typeof val === "object")) {
      return typeof val.then === "function"
    } else {
      return false
    }
  }
  #runMicro(fn) {
    queueMicrotask(fn)
  }

  #runOne(callback, resolve, reject) {
    this.#runMicro(() => {
      if (typeof callback !== "function") {
        const settled =
          this.#state === PROMISE_STATE.FULFILLED ? resolve : reject
        settled(this.#result)
        return
      } else {
        const res = callback(this.#result)
        if (this.#isPromise(res)) {
          res.then(resolve, reject)
        } else {
          resolve(res)
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
      this.#handler.push({ onFulfilled, onRejected, resolve, reject })
      this.#run()
    })
  }
}

const p = new MyPromise((resolve) => {
  resolve(123)
})

p.then(
  (data) => console.log(data, "then2"),
  (rea) => console.log(rea, "rea")
).then(
  (data) => console.log(data, "then1"),
  (rea) => console.log(rea, "then2")
)
