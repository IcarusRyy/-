function currentLimit(max = 4) {
  let queue = []
  let activeCount = 0

  const next = () => {
    activeCount--
    if (queue.length) {
      const task = queue.shift()
      task()
    }
  }

  // 执行函数
  const run = async function (fn, resolve) {
    activeCount++
    const result = (async () => fn())()
    resolve(result)
    try {
      await result
    } finally {
      next()
    }
  }
  // 队列管理
  const enqueue = function (fn, resolve) {
    // 创建任务
    const task = run.bind(null, fn, resolve)
    queue.push(task)
    // 推入任务的时候 符合条件的话 异步调用下一个任务
    ;(async () => {
      await Promise.resolve()
      if (queue.length && activeCount < max) {
        const task = queue.shift()
        task()
      }
    })()
  }
  // 生成器
  const generator = function (fn) {
    return new Promise((resolve) => {
      enqueue(fn, resolve)
    })
  }
  return generator
}

const time = (i) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(i, "i")
      resolve(i)
    }, 1000)
  })
}
const limit = currentLimit(2)
;(async () => {
  const task = [1, 2, 3, 4, 5, 6].map((i) => limit(() => time(i)))
  const res = await Promise.allSettled(task)
  console.log(res)
})()
