Promise.myAll = function (arr) {
  let resolveFn, rejectFn
  let p = new Promise((resolve, reject) => {
    resolveFn = resolve
    rejectFn = reject
  })

  let fulfilledCount = 0,
    i = 0,
    res = []
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
Promise.myAll([1, 23, 456]).then(
  (res) => console.log(res),
  (err) => console.log("err", err)
)
