Promise.myAllsettled = function (proms) {
  return new Promise((resolve, reject) => {
    let count = 0
    let reulst = []

    proms.forEach((item, index) => {
      Promise.resolve(item)
        .then(
          (data) => {
            reulst[index] = data
          },
          (rea) => {
            reulst[index] = rea
          }
        )
        .finally(() => {
          count++
          if (count === proms.length) {
            resolve(reulst)
          }
        })
    })
  })
}

Promise.myAllsettled([1, 2, Promise.reject(3)]).then(
  (res) => {
    console.log("成功", res)
  },
  (err) => console.log("失败", err)
)
