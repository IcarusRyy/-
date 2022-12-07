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
    console.log(this, "this")
    this.#result = value
    this.#state = 1 // 修改resolve状态
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

  // 添加then方法
  then(onFulfilled, onRejected) {
    if (this.#state === PROMISE_STATE.FULFILLED) {
      onFulfilled(this.#result)
    }
  }
}

const mp = new MyPromise((resolve, reject) => {
  resolve("哈哈哈")
})
mp.then((res) => {
  console.log(res, "then")
})
console.log(mp)
