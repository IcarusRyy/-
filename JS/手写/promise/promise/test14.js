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
    const resolve = (data) => this.#changeState(data, PROMISE_STATE.FULFILLED)
    const reject = (rea) => this.#changeState(rea, PROMISE_STATE.REJECTED)
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
  resolve("hello")
})
p.then((data) => {
  console.log(data, "then1")
  return data
}).then((data) => {
  console.log(data, "then2")
})
