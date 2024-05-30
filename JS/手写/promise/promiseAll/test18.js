Promise.myAll = function (arr) {
  let resolveFn, rejectFn
  let p = new Promise((resolve, reject) => {
    resolveFn = resolve
    rejectFn = reject
  })

  let res = []
  let i = 0
  let fulfilledCount = 0

  for (let item of arr) {
    let index = i
    i++
    Promise.resolve(item).then((data) => {
      res[index] = data
      fulfilledCount++
      if (fulfilledCount === arr.length) {
        resolveFn(res)
      }
    }, rejectFn)
  }
  return p
}
