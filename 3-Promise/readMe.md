# Promise
Promise就是一个容器，用于存取异步的一些数据，由于存取的方式特色，所以可以直接将异步调用的结果存储在Promise中。
创建Promise， 构造函数中需要一个函数作为参数
Promise构造函数的回调函数，它会在创建Promise时调用，调用时会有两个参数传递进去，（resolve， reject）, resolve, reject是两个函数，通过这两个函数可以向Promise中存储数据
resolve 在执行正确的时候存储数据
reject 在执行错误的时候存储数据
```
const promiseObj = new Promise((resolve, reject)=>{
resolve('哈哈')
})
```
- 通过Promise.then 以及 Promise.catch方法从Promise中取数据
- 或者then函数中传递两个回调函数参数，第二个参数相当于catch
```
const promiseObj = new Promise((resolve, reject)=>{
setTimeout(()=>{resolve('哈哈')})
})
promiseObj.then(res => console.log('promiseObj中的数据', res))
// promiseObj中的数据 哈哈
```

# Promise 原理
Promise中维护了两个隐藏属性
- PromiseResult
  - 用来存储数据
- PromiseState
  - 记录promise的状态  pending（等待） fulfilled（成功） rejected（拒绝）
  - state状态一旦确定，永远不会再更改。

流程：
  - 当Promise创建时，PromiseState初始值为Pending
    - 当通过resolve存储数据时， PromiseState 变为 fulfilled（完成），PromiseResult变为存储的数据
    - 当通过resolve存储数据时， PromiseState 变为 rejected（拒绝，出错了），PromiseResult变为存储的数据 或者 异常对象
  - 当我们通过then读取数据时，相当于为Promise设置了回调函数
    - 如果PromiseState变为fulfilled，则调用then的第一个回调函数来返回数据
    - 如果PromiseState变为rejected，则调用then的第二个回调函数来返回数据
```
const promiseObj2 = new Promise((resolve, reject)=>{
  resolve('哈哈')
})
promiseObj2.then(result => console.log(result), reason => console.log(reason))
console.log('1')
// 1 
// 哈哈
// then 之后的代码是微任务， 在宏任务执行完毕之后 下一轮循环之前，执行微任务
```
catch(reason => console.log(reason)) 方法用于专门处理Promise异常的方法
finally() 无论是fulfilled状态还是rejected状态，finally最后都会执行