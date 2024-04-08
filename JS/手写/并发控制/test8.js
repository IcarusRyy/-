const concurrentLimit = (max = 4) => {
  let queue = []
  let activeCount = 0

  const next = () => {
    activeCount--
    if (queue.length > 0) {
      queue.shift()()
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

  const enqueue = (fn, resolve) => {
    const task = run.bind(null, fn, resolve)
    queue.push(task)
    ;(async () => {
      await Promise.resolve()

      if (activeCount < max && queue.length > 0) {
        const task = queue.shift()
        task()
      }
    })()
  }

  const generator = (fn) => {
    return new Promise((resolve) => enqueue(fn, resolve))
  }

  return generator
}
