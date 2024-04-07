function concurrentLimit(max) {
  if (!max) {
    new TypeError("xxx")
  }

  let queue = []
  let activeCount = 0

  // 调用下一个
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
      //判断当前执行的任务是否超过最大并发数 以及任务队列
      async () => {
        await Promise.resolve()

        if (activeCount < max && queue.length > 0) {
          const task = queue.shift()
          task()
        }
      }
    )()
  }

  // 构造器
  const generator = (fn) => {
    return new Promise((resolve) => {
      enqueue(fn, resolve)
    })
  }

  return generator
}
