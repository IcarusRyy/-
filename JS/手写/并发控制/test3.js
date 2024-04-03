function plimit(max) {
  if (!max) {
    new TypeError("error")
  }

  let queue = []
  let activeCount = 0

  // 调用下一个任务
  const next = () => {
    activeCount--

    if (queue.length > 0) {
      queue.shift()()
    }
  }

  // 任务执行
  const run = async (fn, resolve) => {
    activeCount++

    const result = (async () => fn())()

    // 对外暴露 promise
    resolve(result)

    try {
      await result
    } finally {
      next()
    }
  }

  // 队列管理
  const enqueue = (fn, resolve) => {
    // 添加任务
    const task = run.bind(null, fn, resolve)
    queue.push(task)(
      // 检查当前任务执行以及是否超过并发数
      async () => {
        await Promise.resolve()

        if (activeCount < max && queue.length > 0) {
          const task = queue.shift()
          task()
        }
      }
    )()
  }

  // 生成器
  const generator = (fn) => {
    return new Promise((resolve) => {
      enqueue(fn, resolve)
    })
  }

  return generator
}
