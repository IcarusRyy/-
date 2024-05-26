// setTimeout(() => {
//   const start = Date.now()
//   while (Date.now() - start < 2000) {
//     // 模拟一个耗时2秒的操作
//   }
//   console.log("First timer end:", new Date())
// }, 1000)

// setTimeout(() => {
//   const start = Date.now()
//   while (Date.now() - start < 2000) {
//     // 模拟一个耗时2秒的操作
//   }
// }, 1000)

// // 首先是1秒后执行第一个回调，回调执行了2秒，然后执行第二个宏任务，第二个宏任务的回调1秒后执行，所以就是两次回调执行间隔是3秒

console.log("Start")

setTimeout(() => {
  console.log("First timer start:", new Date())
  const start = Date.now()
  while (Date.now() - start < 2000) {
    // 模拟一个耗时2秒的操作
  }
  console.log("First timer end:", new Date())
}, 1000)

setTimeout(() => {
  console.log("Second timer start:", new Date())
  const start = Date.now()
  while (Date.now() - start < 2000) {
    // 模拟一个耗时2秒的操作
  }
  console.log("Second timer end:", new Date())
}, 4000)

console.log("End")
