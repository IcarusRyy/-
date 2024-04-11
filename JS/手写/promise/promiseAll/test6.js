Promise.myAll = function (arr) {
  let res, rej
  const p = new Promise((resolve, reject) => {
    res = resolve
    rej = reject
  })

  let i = 0
  let fulfilledCount = 0
  let result = []

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
  if (i === 0) {
    res([])
  }

  return p
}

const p = Promise.myAll([1, 2, Promise.reject(1)]).then(
  (data) => console.log(data),
  (rea) => console.log(rea)
)
