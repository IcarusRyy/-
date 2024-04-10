Promise.MyAll = function (proms) {
  let res, rej
  const p = new Promise((resolve, reject) => {
    res = resolve
    rej = reject
  })
  let i = 0
  let fulfilledCount = 0
  let result = []
  for (let item of proms) {
    const index = i++
    Promise.resolve(item).then((data) => {
      result[index] = data
      fulfilledCount++
      if (fulfilledCount === proms.length) {
        res(result)
      }
    }, rej)
  }
  return p
}

Promise.all([1, 3, Promise.resolve(13)]).then((data) => console.log(data))
