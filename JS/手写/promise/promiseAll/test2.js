Promise.myAll = function (proms) {
  let res, rej
  const p = new Promise((resolve, reject) => {
    res = resolve
    rej = reject
  })

  let i = 0
  let result = []

  let fulfilledCount = 0
  for (let item of proms) {
    const index = i
    i++
    Promise.resolve(item).then((data) => {
      result[index] = data
      fulfilledCount++
      if (i === fulfilledCount) {
        res(result)
      }
    }, rej)
  }

  if (i === 0) {
    res([])
  }
  return p
}

Promise.myAll([1, 2, Promise.reject(3)]).then(
  (res) => {
    console.log(res)
  },
  (err) => console.log(err)
)
