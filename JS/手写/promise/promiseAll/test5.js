Promise.myAll = function (proms) {
  let res, rej
  const p = new Promise((resolve, reject) => {
    res = resolve
    rej = reject
  })

  let i = 0
  let count = 0

  let result = []

  for (let item of proms) {
    const index = i
    i++
    Promise.resolve(item).then((data) => {
      count++
      result[index] = data
      if (count === proms.length) {
        res(result)
      }
    }, rej)
  }

  return p
}

Promise.myAll([1, 2, 4]).then((data) => console.log(data))
