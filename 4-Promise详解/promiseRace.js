function sum(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b)
    }, 1000)
  })
}
Promise.race([sum(1, 2), sum(2, 3), sum(3, 1)]).then((res) => console.log(res)) // 3

// 只返回执行最快的promise，不考虑该promise是否是成功或着失败
Promise.race([Promise.reject("哈哈"), sum(1, 2), sum(2, 3), sum(3, 1)])
  .then((res) => console.log(res))
  .catch((reason) => console.log(reason, "reason")) // 哈哈 reason
