const currentLimit = (max) => {
  if (!max) {
    new TypeError("xxx")
  }
  let queue = []
  let activeCount = 0

  const next = () => {
    activeCount--

    if (queue.length > 0) {
      const task = queue.shift()
      task()
    }
  }

  // 执行函数
  const run = async (fn, resolve) => {
    activeCount++

    const result = async(() => fn())()

    // 对外暴露promise
    resolve(result)

    try {
      await result
    } finally {
      next()
    }
  }

  // 队列管理
  const enqueue = (fn, resolve) => {
    const task = run.bind(null, fn, resolve)
    queue.push(task)(
      // 检查当前任务执行

      async () => {
        await Promise.resolve()

        if (activeCount < max && queue.length > 0) {
          const task = queue.shift()
          task()
        }
      }
    )()
  }

  // 构造器函数

  const generator = (fn) => {
    return new Promise((resolve) => {
      enqueue(fn, resolve)
    })
  }

  return generator
}
