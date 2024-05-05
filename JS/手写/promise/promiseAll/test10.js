Promise.myAll = function (arr) {
  let res, rej
  const p = new Promise((resolve, reject) => {
    res = resolve
    rej = reject
  })

  let result = []
  let i = 0
  for (let item of arr) {
    Promise.resolve(item).then((data) => {
      const index = i
      i++
      result[index] = data
      if (i === arr.length) {
        res(result)
      }
    }, rej)
  }
  return p
}

Promise.myAll([1, 2, 3, Promise.reject(4), 5]).then(
  (data) => {
    console.log(data)
  },
  (rea) => console.log(rea)
)
