function sum(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b)
    }, 1000)
  })
}

// 传入的promise 中有报错的promise，则排除该报错的promise，返回正确的promise，返回结果是一个数组
Promise.allSettled([sum(1, 2), sum(2, 3), Promise.reject("哈哈"), sum(3, 1)])
  .then((res) => console.log(res))
  // [
  //   ({ status: "fulfilled", value: 3 },
  //   { status: "fulfilled", value: 5 },
  //   { status: "rejected", reason: "哈哈" },
  //   { status: "fulfilled", value: 4 })
  // ]
  .catch((reason) => console.log(reason, "reason"))
