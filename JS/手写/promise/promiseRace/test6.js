Promise.myRace = function (arr) {
  return new Promise((resolve, reject) => {
    for (let item of arr) {
      Promise.resolve(item).then(resolve, reject)
    }
  })
}
Promise.myRace([1, 2, Promise.reject(3)]).then(
  (res) => {
    console.log("成功", res)
  },
  (err) => console.log("失败", err)
)
