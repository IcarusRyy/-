const PROMISE_STATE = {
  PENDING: 0,
  FULFILLED: 1,
  REJECTED: 2,
}
class MyPromise {
  // 用来存储resolve  Promise的结果
  #result
  // 创建一个变量来记录Promise的状态
  #state = PROMISE_STATE.PENDING
  // 创建一个变量存储回调函数,由于回调函数可能有多个，所以使用数组
  #callbacks = []
  // 接受一个执行器作为参数, executor其实就是调用该类创建实例传递的函数参数
  constructor(executor) {
    // executor(this.#resolve, this.#reject) // 调用回调函数

    // resolve和reject不使用箭头函数方式定义，需要将this绑定在当前实例上
    executor(this.#resolve.bind(this), this.#reject.bind(this))
  }
  // #标明 resolve 和 reject 是该类的私有方法，而不能通过实例直接调用
  #resolve(value) {
    // 禁止值被重复修改
    if (this.#state !== PROMISE_STATE.PENDING) return
    console.log("执行resolve", value)
    // this是undefined 因为调用resolve的方法 并不是xxx.属性的方式
    // 解决这种问题有两种方式
    // 1、将resolve改写为箭头函数
    // console.log(this, "this")
    this.#result = value
    this.#state = 1 // 修改resolve状态

    // 当resolve执行的时候，说明数据已经进来了，需要调用then的回调函数，通过回调函数将数据返回
    // 防止同步时报错，因为同步时直接执行resolve，此时并没有callback
    // this.#callback && this.#callback(this.#result)
    // then方法对回调函数要在微任务队列执行，而不是直接调用，采用queueMicrotask()
    queueMicrotask(() => {
      // 调用callbacks中的所有函数
      // !!this.#callback && this.#callback(this.#result)
      this.#callbacks.forEach((cb) => {
        cb()
      })
    })
  }
  #reject(reason) {
    console.log(reason, "reason")
  }
  // 方式1
  // 在类中，直接通过函数名(){}函数的方式 是放在原型中，而通过箭头函数的方式，是放在实例中的
  // #resolve = (value) => {
  //   // 箭头函数内的this指向当前类的实例
  //   console.log(this, "箭头函数的this")
  //   console.log(value, "value")
  //   this.#result = value
  //   console.log(this.#result, "result")
  // }
  // // 方式2
  // // 在constructor中传参，使用bind函数将this绑定在当前实例对象上。
  // #reject = (reason) => {
  //   console.log("执行reject")
  // }

  /**
   *
   * @param {*} onFulfilled
   * @param {*} onRejected
   * @returns
   * then中回调函数的返回值会成为新的promise中的数据
   */
  // 添加then方法
  then(onFulfilled, onRejected) {
    // then方法要链式调用，所以要返回一个promise
    return new MyPromise((resolve, reject) => {
      // 借助callback变量 处理异步
      if (this.#state === PROMISE_STATE.PENDING) {
        console.log(this.#state, "状态1")
        // 进入判断说明数据还没有进入Promise，将回调函数设置为callback的值
        this.#callbacks.push(() => {
          // 需要onfulfilled的返回值作为resolve的参数
          resolve(onFulfilled(this.#result))
        })
      } else if (this.#state === PROMISE_STATE.FULFILLED) {
        console.log(this.#state, "状态2")
        // then回调函数要放在微任务队列去执行，而不是直接调用
        queueMicrotask(() => {
          resolve(onFulfilled(this.#result))
        })
      }
    })
  }
}

// const mp = new MyPromise((resolve, reject) => {
//   resolve("哈哈哈")
// })
// 异步情况
const mp = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("孙悟空")
  }, 1000)
})
mp.then((res) => {
  console.log(res, "then1")
  return "猪八戒"
}).then((res) => {
  console.log(res, "链式调用then")
})
// mp.then((res) => {
//   console.log(res, "then2")
// })
console.log(mp, "mp")
