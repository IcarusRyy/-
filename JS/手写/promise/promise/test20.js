const PROMISE_STATE = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
}

class MyPromise {
  #state = PROMISE_STATE.PENDING
  #result
  #handleChange = []
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
    if (this.#state !== PROMISE_STATE.PENDING) return
    this.#state = state
    this.#result = data
    this.#run()
  }

  #isPromise(val) {
    if (val && (typeof val === "object" || typeof val === "function")) {
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
    while (this.#handleChange.length) {
      const { onFulfilled, onRejected, resolve, reject } =
        this.#handleChange.shift()
      if (this.#state === PROMISE_STATE.FULFILLED) {
        this.#runOne(onFulfilled, resolve, reject)
      } else {
        this.#runOne(onRejected, resolve, reject)
      }
    }
  }
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#handleChange.push({
        onFulfilled,
        onRejected,
        resolve,
        reject,
      })
      this.#run()
    })
  }
}

const p = new MyPromise((resolve) => resolve(1))

p.then((res) => {
  console.log(res)
  return 2
}).then((res) => {
  console.log(res)
})
