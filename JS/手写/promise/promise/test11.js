const PROMISE_STATE = {
  fulfilled: "fulfilled",
  rejected: "rejected",
  pending: "pending",
}

class MyPromise {
  #state = PROMISE_STATE.pending

  #result

  #handler = []
  constructor(executor) {
    let resolve = (data) => this.#changeState(data, PROMISE_STATE.fulfilled)
    let reject = (rea) => this.#changeState(rea, PROMISE_STATE.rejected)
    try {
      executor(resolve, reject)
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
          this.#state === PROMISE_STATE.fulfilled ? resolve : reject
        settled(this.#result)
        return
      } else {
        const data = callback(this.#result)
        if (this.#isPromise(data)) {
          data.then(resolve, reject)
        } else {
          resolve(data)
        }
      }
    })
  }

  #run() {
    if (this.#state === PROMISE_STATE.pending) return
    const { onFulfilled, onRejected, resolve, reject } = this.#handler.shift()
    if (this.#state === PROMISE_STATE.fulfilled) {
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
  // resolve(123)
  reject(456)
})

p.then(
  (data) => console.log(data, "chenggong"),
  (rea) => console.log(rea, "shibai")
)
