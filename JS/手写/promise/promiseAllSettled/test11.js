Promise.myAllsettled = function (arr) {
  return new Promise((resolve, reject) => {
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
