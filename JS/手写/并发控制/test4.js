function concurrentLimit(max) {
  if (!max) {
    new TypeError("error")
  }

  let queue = []

  let activeCount = 0

  // 调用下一个任务
  const next = () => {
    activeCount--

    if (queue.length > 0) {
      const task = queue.shift()
      task()
    }
  }

  // 执行任务
  const run = async (fn, resolve) => {
    activeCount++

    const result = (async () => fn())()

    // 对外暴露promise
    resolve(result)

    try {
      await result
    } finally {
      next
    }
  }

  // 队列管理
  const enqueue = (fn, resolve) => {
    const task = run.bind(null, fn, resolve)
    queue.push(task)(async () => {
      await Promise.resolve()

      if (activeCount < max && queue.length > 0) {
        const task = queue.shift()
        task()
      }
    })()
  }

  // 生成器
  const generator = (fn) => {
    new Promise((resolve) => {
      enqueue(fn, resolve)
    })
  }

  return generator
}
