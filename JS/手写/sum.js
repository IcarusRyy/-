// function sum(...args) {
//   const foo = (...rest) => sum(...args, ...rest)
//   foo.valueOf = () => args.reduce((x, y) => x + y, 0)
//   return foo
// }

// console.log(sum(1)(2, 3) + sum(1))

// function test(a, b) {
//   return a + b
// }

// console.log(test.toString())
// setTimeout(() => console.log(0))
// new Promise((resolve) => {
//   console.log(1)
//   resolve(2)
//   console.log(3)
// }).then((o) => console.log(o))

// new Promise((resolve) => {
//   console.log(4)
//   resolve(5)
// })
//   .then((o) => console.log(o))
//   .then(() => console.log(6))

Promise.resolve(console.log(0))
  .then(() => {
    console.log(1)
    Promise.resolve(console.log(5))
      .then(() => console.log(3))
      .then(() => console.log(4))
      .then(() => console.log(6))
  })
  .then(() => console.log(2))
  .then(() => console.log(7))
