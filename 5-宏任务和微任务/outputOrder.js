// Promise.resolve().then(() => {
//   console.log(3)
//   Promise.resolve().then(() => {
//     setTimeout(() => {
//       console.log(2)
//     }, 0)
//   })
// })
// queueMicrotask(() => console.log(1))

// console.log(1)
// setTimeout(() => console.log(2), 0)
// Promise.resolve().then(() => console.log(3))
// Promise.resolve().then(() => setTimeout(() => console.log(4), 0))
// Promise.resolve().then(() => console.log(5))
// setTimeout(() => console.log(6), 0)
// console.log(7)

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
