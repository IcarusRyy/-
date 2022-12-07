// async function fn() {
//   console.log(1)
//   // 当调用await调用函数后，当前函数后边的所有代码会在当前函数执行完毕后，被放入到微任务队列中
//   await console.log(2)
//   console.log(3)
// }
// fn()
// console.log(4)

// function fn() {
//   return new Promise((resolve) => {
//     console.log(1)
//     // 加了await
//     console.log(2)
//     resolve()
//   }).then((r) => console.log(3))
// }
// fn()
// console.log(4)

// async function fn() {
//   console.log(1)
//   // 当调用await调用函数后，当前函数后边的所有代码会在当前函数执行完毕后，被放入到微任务队列中
//   await console.log(2)
//   await console.log(3)
//   console.log(5)
// }
// fn()
// console.log(4)

function fn() {
  return new Promise((resolve) => {
    console.log(1)
    // 加了await
    console.log(2)
    resolve()
  })
    .then((r) => console.log(3))
    .then((r) => console.log(5))
}
fn()
console.log(4)
