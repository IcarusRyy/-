const concurrentLimit = function (max = 4) {
  let queue = []
  let activeCount = 0

  // 调用下一个任务
  const next = () => {
    activeCount--

    if (queue.length) {
      const task = queue.shift()
      task()
    }
  }

  // 执行任务
  const run = async (fn, resolve) => {
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
    ;(async () => {
      await Promise.resolve()
      if (queue.length) {
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
