Promise.myAll = function (arr) {
  let res, rej
  let p = new Promise((resolve, reject) => {
    res = resolve
    rej = reject
  })

  let result = []
  let i = 0
  let fulfilledCount = 0

  for (let item of arr) {
    let index = i
    i++
    Promise.resolve(item).then((data) => {
      result[index] = data
      fulfilledCount++
      if (fulfilledCount === arr.length) {
        res(result)
      }
    }, rej)
  }
  return p
}

Promise.myAll([1, 3, 5]).then((data) => console.log(data))
