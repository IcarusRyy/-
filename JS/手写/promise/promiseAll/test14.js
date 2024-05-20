Promise.myAll = function (arr) {
  let res, rej
  const p = new Promise((resolve, reject) => {
    res = resolve
    rej = reject
  })

  let result = [],
    i = 0,
    fulfilledCount = 0

  for (let item of arr) {
    let index = i
    i++
    Promise.resolve(item).then((data) => {
      result[index] = data
      fulfilledCount++
      if (i === fulfilledCount) {
        res(result)
      }
    }, rej)
  }
  return p
}
Promise.myAll([1, 23, Promise.reject(999)]).then(
  (res) => console.log(res),
  (err) => console.log("err", err)
)
