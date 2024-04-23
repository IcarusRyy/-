Promise.myAllSettled = function (arr) {
  return new Promise((resolve) => {
    let res = [],
      count = 0

    arr.forEach((item, index) => {
      Promise.resolve(item)
        .then(
          (data) => {
            res[index] = data
          },
          (rea) => {
            res[index] = rea
          }
        )
        .finally(() => {
          count++
          if (count === arr.length) {
            resolve(res)
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
