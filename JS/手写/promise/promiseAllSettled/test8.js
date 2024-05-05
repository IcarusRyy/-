Promise.myAllSettled = function (arr) {
  return new Promise((resolve, reject) => {
    let result = []
    let fulfilledCount = 0
    arr.forEach((item, index) => {
      Promise.resolve(item)
        .then(
          (data) => {
            result[index] = data
          },
          (rea) => (result[index] = rea)
        )
        .finally(() => {
          fulfilledCount++
          if (fulfilledCount === arr.length) {
            resolve(result)
          }
        })
    })
  })
}
