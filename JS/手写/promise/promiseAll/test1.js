Promise.myAll = function (proms) {
  let resl, reje
  const p = new Promise((resolve, reject) => {
    resl = resolve
    reje = reject
  })
  let i = 0
  let fulfilledCount = 0
  let result = []
  for (let item of proms) {
    const index = i
    i++
    Promise.resolve(item).then((data) => {
      result[index] = data
      fulfilledCount++
      if (fulfilledCount === i) {
        resl(result)
      }
    }, reje)
  }

  if (i === 0) {
    return resl([])
  }
  return p
}

Promise.myAll([1, 23, Promise.resolve(999)]).then(
  (res) => console.log(res),
  (err) => console.log("err", err)
)
