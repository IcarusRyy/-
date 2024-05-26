Promise.myAll = function (arr) {
  let resolveFn, rejectFn
  const p = new Promise((resolve, reject) => {
    resolveFn = resolve
    rejectFn = reject
  })
  let result = []
  let fulfilledCount = 0
  let i = 0
  for (let item of arr) {
    const index = i
    i++
    Promise.resolve(item).then((data) => {
      result[index] = data
      fulfilledCount++
      if (fulfilledCount === arr.length) {
        resolveFn(result)
      }
    }, rejectFn)
  }
  return p
}
Promise.myAll([1, 23, 456]).then(
  (res) => console.log(res),
  (err) => console.log("err", err)
)
