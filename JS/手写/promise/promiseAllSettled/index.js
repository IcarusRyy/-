Promise.myAllSettled = function (proms) {
  let res
  const p = new Promise((resolve) => {
    res = resolve
  })

  let i = 0
  let result = []
  let processedCount = 0

  for (let item of proms) {
    const index = i
    i++
    Promise.resolve(item).then(
      (value) => {
        result[index] = { status: "fulfilled", value: value }
        processedCount++
        if (i === processedCount) {
          res(result)
        }
      },
      (reason) => {
        result[index] = { status: "rejected", reason: reason }
        processedCount++
        if (i === processedCount) {
          res(result)
        }
      }
    )
  }

  if (i === 0) {
    res([])
  }

  return p
}

Promise.myAllSettled([1, 2, Promise.reject(3)]).then(
  (res) => {
    console.log("成功", res)
  },
  (err) => console.log("失败", err)
)
