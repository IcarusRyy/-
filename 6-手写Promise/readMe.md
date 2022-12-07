# 手写Promise
- 结果变量
- 状态变量
- 回调函数变量
  - 可能会有多个，所以要为数组
- 内部私有方法 resolve reject
  - 注意改变this指向，通过箭头函数或着在constructor的参数中使用bind这两种方式改变this指向为当前类的实例对象
- then方法
  - 处理同步
  - 处理异步
  - then的回调函数要在微任务队列执行，而不是直接调用,采用queueMicrotask()



- 同步问题
  - 直接调用resolve
- 异步问题
  - 定时器调用resolve
- 微任务队列问题
  - 采用queueMicrotask()
- 重复调用问题
  - 将callbacks变量设定为一个数组，否则后面的then传递的回调函数会将前面的回调函数覆盖
- 链式调用问题
  - then返回一个新的promise 实例对象

```
const PROMISE_STATE = {
  PENDING:0,
  FULFILLED:1,
  REJECTED:2
}
class MyPromise {
  #result // 保存结果
  #state = PROMISE_STATE.PENDING // 初始状态为pending
  #callbacks = [] // 保存then回调函数
  constructor(executor){
    // executor函数 其实就是调用MyPromise类传的函数参数
    executor(this.#resolve.bind(this), this.#reject.bind(this))
  }
  // resolve方法
  #resolve(value){
    this.#result = value
    this.#state  = 1
    // 将then方法中的回调函数参数添加到微任务队列 接住 queueMicrotask 方法
    queueMicrotask(()=>{
      this.#callbacks.forEach(cb =>{
        cb()
      })
    })
  }
  // reject方法
  #reject(reason){
    console.log(reason)
  }
  // then方法 接受两个回调函数的参数 onFulfilled onRejected
  then(onFulfilled, onRejected){
    // then要返回一个promise
    return new MyPromise((resolve, reject)=>{
      // 如果状态是pending的话，需要将回调函数加入到微任务队列
      if(this.#state === PROMISE_STATE.PENDING){
        this.#callbacks.push(() => {
          // 需要onfulfilled的返回值作为resolve的参数 所以在此处直接调用resolve
          resolve(onFulfilled(this.#result))
        })
      }else if (this.#state === PROMISE_STATE.FULFILLED){
        // then回调函数要放在微任务队列去执行，而不是直接调用
        queueMicrotask(() => {
          resolve(onFulfilled(this.#result))
        })
      }
    })
  }
}
```