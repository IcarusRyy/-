Promise.myAllSettled = function (arr) {
  return new Promise((resolve, reject) => {
    let count = 0,
      result = []
    arr.forEach((item, index) => {
      Promise.resolve(item)
        .then(
          (data) => (result[index] = data),
          (rea) => (result[index] = rea)
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
