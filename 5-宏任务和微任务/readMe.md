# 宏任务和微任务
JS是单线程语言，是基于事件循环机制（event loop）
Promise 执行原理
- Promise在执行的时候，then就相当于给Promise了回调函数，当Promise的状态从pending变为fulfilled时，then的回调会被放在任务队列中等待。
  
```
setTimeout(() => console.log(1) , 0)
Promise.resolve(2).then(() => console.log(2))
console.log(3)
// 3
// 2
// 1
```
任务队列
- 宏任务队列
  - 大部分代码都去宏任务队列排队 如同步任务 定时器等
- 微任务队列
  - Promise的回调函数（then catch finally）
- 整个流程
  - 执行调用栈中的代码
  - 执行微任务队列中的所有任务 如 then catch finally等
  - 执行宏任务队列中的所有任务 如同步任务 定时器等
```
queueMicrotask()  // 用来向微任务队列添加一个任务
```
```
queueMicrotask(() => console.log(2))
console.log(1)
// 1
// 2

setTimeout(() => console.log(2), 0)
queueMicrotask(() => console.log(1))
console.log(3)
// 3
// 1
// 2

setTimeout(() => console.log(3), 0)
Promise.resolve().then(()=>{console.log(2)})
queueMicrotask(() => console.log(1))
// 2
// 1
// 3
```
```
Promise.resolve().then(()=>{
  setTimeout(()=>{
    console.log(2)
  },0)
})
queueMicrotask(() => console.log(1))
// 1
// 2

Promise.resolve().then(()=>{
  console.log(3)
  Promise.resolve().then(() => {
    setTimeout(() => {
      console.log(2)
    }, 0)
  })
})
queueMicrotask(() => console.log(1))
// 3
// 1
// 2
```

真题演练
```
console.log(1) // 同1
setTimeout(() => console.log(2), 0) // 宏1
Promise.resolve().then(() => console.log(3)) // 微1
Promise.resolve().then(() => setTimeout(()=>console.log(4), 0)) // 微2 添加到宏任务队列
Promise.resolve().then(() => console.log(5)) // 微3
setTimeout(() => console.log(6), 0) // 宏2
console.log(7) // 同2
// 1
// 7
// 3
// 5
// 2
// 6
// 4

console.log(6)
setTimeout(() => console.log(4), 0)
Promise.resolve().then(() => {
  console.log(3)
  setTimeout(() => console.log(8), 0)

  Promise.resolve().then(() => {
    setTimeout(() => {
      console.log(2)
    }, 0)
  })
})
setTimeout(() => console.log(5), 0)
queueMicrotask(() => console.log(1))
console.log(7)
//  6 7 3 1 4 5 8 2
```