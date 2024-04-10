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
      fulfilledCount++
      result[index] = data
      if (fulfilledCount === proms.length) {
        res(result)
      }
    }, rej)
  }

  return p
}

Promise.myAll([1, 3, Promise.resolve(445)]).then((data) => console.log(data))
