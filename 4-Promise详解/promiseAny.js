function sum(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b)
    }, 1000)
  })
}
Promise.any([sum(1, 2), sum(2, 3), sum(3, 1)]).then((res) => console.log(res)) // 3

// 只返回执行最快的promise
Promise.any([Promise.reject("哈哈"), sum(1, 2), sum(2, 3), sum(3, 1)])
  .then((res) => console.log(res))
  .catch((reason) => console.log(reason, "reason")) // 3

// Promise.resolve().then(() => {
//   console.log(111)
// })
// console.log(222)
