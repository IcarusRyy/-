Promise.myAll = function (arr) {
  let res, rej
  let p = new Promise((resolve, reject) => {
    res = resolve
    rej = reject
  })
  let result = []
  let i = 0
  let fulfilledCount = 0
  for (let item of arr) {
    const index = i
    i++
    Promise.resolve(item).then((data) => {
      result[index] = data
      fulfilledCount++
      if (fulfilledCount === arr.length) {
        res(result)
      }
    }, rej)
  }
  return p
}

Promise.myAll([1, 2, 3, 4, 5]).then(
  (data) => {
    console.log(data)
  },
  (rea) => console.log(rea)
)
