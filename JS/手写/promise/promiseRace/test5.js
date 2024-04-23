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

// setTimeout(function () {
//   console.log(1)
// }, 0)
// new Promise(function executor(resolve) {
//   console.log(2)
//   for (var i = 0; i < 10000; i++) {
//     resolve()
//   }
//   console.log(3)
// }).then(function () {
//   console.log(4)
// })
// console.log(5)
