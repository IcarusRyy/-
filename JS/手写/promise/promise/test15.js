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
    const resolve = (data) => this.#changeState(PROMISE_STATE.FULFILLED, data)
    const reject = (rea) => this.#changeState(PROMISE_STATE.FULFILLED, rea)
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
        const data = callback(this.#state)
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
        this.#runOne(onFulfilled, resolve, reject)
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

const p = new Promise((resolve) => resolve(123))

p.then((data) => {
  console.log(data, "then1")
  // return data
}).then((data) => console.log(data, "then2"))

MyPromise.myAll = function (arr) {
  let res, rej
  const p = new MyPromise((resolve, reject) => {
    res = resolve
    rej = reject
  })

  let i = 0,
    result = []

  for (let item of arr) {
    Promise.resolve(item).then((data) => {
      const index = i
      i++

      result[index] = data
      if (i === arr.length) {
        res(result)
      }
    }, rej)
  }
  return p
}

MyPromise.myRace = function (arr) {
  return new Promise((resolve, reject) => {
    for (let item of arr) {
      Promise.resolve(item).then(resolve, reject)
    }
  })
}

MyPromise.myAllSettled = function (arr) {
  return new Promise((resolve, reject) => {
    let i = 0,
      reject = []
    arr.forEach((item, index) => {
      Promise.resolve(item)
        .then(
          (data) => {
            result[index] = data
          },
          (rea) => {
            result[index] = data
          }
        )
        .finally(() => {
          i++
          if (i === arr.length) {
            resolve(result)
          }
        })
    })
  })
}
