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
    if (this.#state !== PROMISE_STATE.PENDING) return

    this.#state = state
    this.#result = data
    this.#run()
  }

  #isPromise(value) {
    if (
      value !== null &&
      (typeof value === "function" || typeof value === "object")
    ) {
      return typeof value.then === "function"
    } else {
      return false
    }
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
        return
      } else {
        try {
          const data = callback(this.#result)
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
  resolve(123)
  // reject(456)
})

p.then(
  (data) => {
    console.log("成功完成：", data)
    return 999
  },
  (err) => {
    console.log("失败完成：", err)
  }
).then((data) => {
  console.log("成功完成2：", data)
})

console.log(p)
