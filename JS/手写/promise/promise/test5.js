const PROMISE_STATUS = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
}

class MyPromise {
  #state = PROMISE_STATUS.PENDING
  #result
  #handlers = []

  #changeState(data, state) {
    if (this.#state !== PROMISE_STATUS.PENDING) return
    this.#result = data
    this.#state = state
    this.#run()
  }
  constructor(generator) {
    const resolve = (data) => {
      this.#changeState(data, PROMISE_STATUS.FULFILLED)
    }
    const reject = (rea) => {
      this.#changeState(rea, PROMISE_STATUS.REJECTED)
    }
    try {
      generator(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  #isPromise(val) {
    if ((typeof val === "object" || typeof val === "function") && val) {
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
          this.#state === PROMISE_STATUS.FULFILLED ? resolve : reject
        settled(this.#result)
        return
      } else {
        try {
          const res = callback(this.#result)
          console.log(res, "res")
          if (this.#isPromise(res)) {
            res.then(resolve, reject)
          } else {
            resolve(res)
          }
        } catch (err) {
          reject(err)
        }
      }
    })
  }

  #run() {
    if (this.#state === PROMISE_STATUS.PENDING) return
    while (this.#handlers.length) {
      const { onFulfilled, onRejected, resolve, reject } =
        this.#handlers.shift()
      if (this.#state === PROMISE_STATUS.FULFILLED) {
        this.#runOne(onFulfilled, resolve, reject)
      } else {
        this.#runOne(onRejected, resolve, reject)
      }
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#handlers.push({ onFulfilled, onRejected, resolve, reject })

      this.#run()
    })
  }
}

const p = new MyPromise((resolve, reject) => {
  resolve(1)
})
p.then(
  (data) => {
    console.log("成功完成了：", data)
  },
  (rea) => {
    console.log("失败完成了：", rea)
  }
)
