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
    let resolve = (data) => this.#changeState(PROMISE_STATE.FULFILLED, data)
    let reject = (rea) => this.#changeState(PROMISE_STATE.REJECTED, rea)
    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  #changeState(state, data) {
    if (this.#state !== PROMISE_STATE.PENDING) return
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
    if (this.state === PROMISE_STATE.PENDING) return
    while (this.#handler.length > 0) {
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
  resolve(1)
})

p.then((data) => console.log(data))
