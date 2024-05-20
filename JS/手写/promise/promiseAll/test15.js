Promise.myAll = function (arr) {
  let resolveFn, rejectFn
  const p = new Promise((resolve, reject) => {
    resolveFn = resolve
    rejectFn = reject
  })
  let res = [],
    i = 0,
    fulfilledCount = 0
  for (let item of arr) {
    let index = i
    i++
    Promise.resolve(item).then((data) => {
      res[index] = data
      fulfilledCount++
      if (i === fulfilledCount) {
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
