Promise.myAllsettled = function (arr) {
  return new Promise((resolve, reject) => {
    let count = 0
    let result = []

    arr.forEach((item, index) => {
      Promise.resolve(item)
        .then(
          (data) => {
            result[index] = data
          },
          (rea) => {
            result[index] = rea
          }
        )
        .finally(() => {
          count++
          if (count === arr.length) {
            resolve(result)
          }
        })
    })
  })
}

Promise.myAllsettled([1, 2, 3, Promise.reject(4)]).then(
  (data) => console.log(data),
  (rea) => console.log(rea)
)
