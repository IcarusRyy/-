# async 和 await
node 文档
<https://nodejs.dev/en/>

**解决Promise的链式调用**
**async 创建异步函数的语法糖**
通过async快速创建异步函数（返回promise的函数就是异步函数）
异步函数的返回值会自动封装到一个Promise中返回
```
function fn(){
  return Promise.resolve(1)
}
// 等价于
async function (){
  return 1
}
```

**在async声明的异步函数中可以使用await**
**await不会阻塞异步函数意外的代码，只会阻塞异步函数之内的代码**
**阻塞内部代码是没有意义的，因为后面的代码依赖于await 函数的返回结果**
**通过await调用异步代码，通过try catch 来捕捉异常**
```
async function fn(){
  console.log(1)
  console.log(2)
  console.log(3)
}
console.log(4)
// 1 2 3 4
// 等价于
function fn(){
  return new Promise(resolve => {
    console.log(1)
    console.log(2)
    console.log(3)
  })
}
console.log(4)
```
**同步代码前面也可以加await**
```
async function fn(){
  console.log(1)
  // 当调用await调用函数后，当前函数后边的所有代码会在当前函数执行完毕后，被放入到微任务队列中
  await console.log(2)
  await console.log(3)
  console.log(5)
}
fn()
console.log(4)
// 1
// 2
// 4
// 3
// 5

// 等价于

function fn(){
  return new Promise(resolve => {
    console.log(1)
    // 加了await
    console.log(2)
    resolve()
  }).then(r => console.log(3))
  .then(r => console.log(5))
}
fn()
console.log(4)
```