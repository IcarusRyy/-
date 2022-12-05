function sum(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b)
    }, 1000)
  })
}
Promise.all([sum(1, 2), sum(2, 3), sum(3, 1)]).then((res) => console.log(res)) // [3,5,4]
Promise.all([sum(1, 2), sum(2, 3), Promise.reject("哈哈"), sum(3, 1)])
  .then((res) => console.log(res))
  .catch((reason) => console.log(reason, "reason"))
