Promise.myAll = function (proms) {
  let res, rej
  const p = new Promise((resolve, reject) => {
    res = resolve
    rej = reject
  })

  let i = 0
  let fulfilledCount = 0
  let result = []

  for (let item of proms) {
    const index = i
    i++
    // rej只有第一次调用有意义
    Promise.resolve(item).then((data) => {
      // 1、把完成的数据汇总到最终结果
      result[index] = data
      // 2、判定是否全部完成
      fulfilledCount++
      // i一定是整体的数量，因为这里是异步代码，也就是在微队列里执行，所以i一定是最终的数量
      if (i === fulfilledCount) {
        res(result)
      }
    }, rej)
  }
  if (i === 0) {
    res([])
  }

  return p
}

Promise.myAll([1, 23, Promise.reject(999)]).then(
  (res) => console.log(res),
  (err) => console.log("err", err)
)
