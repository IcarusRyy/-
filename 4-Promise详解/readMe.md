# Promise详解
Promise就是一个容器，用于存取异步的一些数据，由于存取的方式特色，所以可以直接将异步调用的结果存储在Promise中。
```
const promiseObj = new Promise((resolve, reject) => {
  resole('存储数据a')
})
promise.then(result => console.log(result, '存储的数据'))
```

```
function sum (a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b)
    }, 1000)
  })
}
const result = sum (1, 2)
console.log(result) //得到一个promise对象实例
```
```
function sum (a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b)
    }, 1000)
  })
}
sum (1, 2).then(result => console.log(result)) // 3
sum (1, 2)
.then(result => result + 1)
.then(result => result + 1)
.then(result => console.log(result)) // 5
```
- then catch finally 这三个方法都会返回一个新的promise
- promise中会存储回调函数的返回值
- finally 的返回值不会存储到新的Promise中
// 解决回调地狱问题
```
const promise = new Promise((resolve, reject) => {
  resolve("初始数据")
})
const p1 = promise.then((result) => {
  console.log(result)
  return "第一个then"
})
const p2 = p1.then((result) => {
  console.log(result)
})
--------------
promise
  .then((result) => {
    console.log(result) // 初始数据
    return "第一个then"
  })
  .then(result => {
    console.log(result) // 第一个then
  })
  // 所以 promise.then又造成链式调用地狱的问题， 用async await 解决
```

# Promise 的静态方法
直接通过Promise类调用
Promise.resolve(0) 创建一个立即成功的promise 等价于  new Promise((resolve, reject) => resolve(0))
Promise.reject() 创建一个立即拒绝的promise

  ## Promise.all() 
- promise.all 返回一个promise ,但是promise的执行结果以数组的形式返回
- 接受一个数组参数，数组每一项都是一个promise
- 等所有的promise执行完毕，一起返回
- 如果其中有一个失败，则返回出错的promise
```
  function sum (a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b)
    }, 1000)
  })
}
Promise.all([sum(1,2), sum(2,3), sum(3,1)]).then(res => console.log(res)) // [3, 5 ,4]

// 但是传入的promise 中有报错的promise，则返回该报错的promise
Promise.all([sum(1,2), sum(2,3), Promise.reject('哈哈'),sum(3,1)])
.then(res => console.log(res))
.catch((reason) => console.log(reason, "reason")) // 哈哈 reason
```
##  Promise.AllSettled()
- 接收一个数组参数，数组每一项都是一个promise
- 返回一个结果数组，数组的每一项是一个对象，包含对应的promise的状态status以及返回结果value， 无论失败或者成功，全部都会返回
- 如果参数中有错误的promise， 则和正确的promise结果一起返回
```
  function sum (a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b)
    }, 1000)
  })
}

// 传入的promise 中有报错的promise，则排除该报错的promise，返回正确的promise，返回结果是一个数组
Promise.allSettled([sum(1,2), sum(2,3), Promise.reject('哈哈'),sum(3,1)])
.then(res => console.log(res))
.catch((reason) => console.log(reason, "reason")) 
<!-- [
  { status: 'fulfilled', value: 3 },
  { status: 'fulfilled', value: 5 },
  { status: 'rejected', reason: '哈哈' },
  { status: 'fulfilled', value: 4 }
] -->
```
## Promise.race()
- 接收一个promise数组参数，数组每一项都是一个promise
- 谁返回的最快，无论成功或着失败，都返回执行最快的promise
- race不考虑promise的状态是否是成功或着失败
```
  function sum (a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b)
    }, 1000)
  })
}
Promise.race([sum(1,2), sum(2,3), sum(3,1)]).then(res => console.log(res)) // 再打印 3

// 只返回执行最快的promise，不考虑该promise是否是成功或着失败
Promise.race([ Promise.reject('哈哈'),sum(1,2), sum(2,3),sum(3,1)])
.then(res => console.log(res))
.catch((reason) => console.log(reason, "reason")) // 先打印 哈哈 reason
```
## Promise.any()
- 接收一个promise数组参数，数组每一项都是一个promise
- 谁返回的最快，只返回执行最快的并且成功的promise
- any考虑promise的状态是否是成功或着失败
- 如果传入的promise数组全部是错误的promise，则报错，被catch捕捉。
```
  function sum (a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b)
    }, 1000)
  })
}
Promise.race([sum(1,2), sum(2,3), sum(3,1)]).then(res => console.log(res)) //  3

// 只返回执行最快的并且成功的promise
Promise.race([ Promise.reject('哈哈'),sum(1,2), sum(2,3),sum(3,1)])
.then(res => console.log(res))
.catch((reason) => console.log(reason, "reason")) // 3
```