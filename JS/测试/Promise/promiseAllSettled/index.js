Promise.myAllSettled = function (proms) {
  return new Promise((resolve, reject) => {
    let count = 0
    let result = []

    proms.forEach((item, index) => {
      Promise.resolve(item)
        .then(
          (res) => {
            result[index] = res
          },
          (rea) => {
            result[index] = rea
          }
        )
        .finally(() => {
          count++
          if (count === proms.length) {
            resolve(result)
          }
        })
    })
  })
}

Promise.myAllSettled([1, 2, Promise.reject(3)]).then(
  (res) => {
    console.log("成功", res)
  },
  (err) => console.log("失败", err)
)
