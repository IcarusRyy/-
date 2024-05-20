function concurrentLimit(max = 2) {
  let queue = []
  let activeCount = 0

  // 调用下一个任务
  const next = function () {
    activeCount--
    if (queue.length > 0) {
      const nextTask = queue.shift()
      nextTask()
    }
  }

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
    const task = run.bind(null, fn, resolve)
    queue.push(task)
    ;(async () => {
      await Promise.resolve()
      if (activeCount < max && queue.length > 0) {
        const nextTask = queue.shift()
        nextTask()
      }
    })()
  }

  // 构造器
  const generator = function (fn) {
    return new Promise((resolve) => {
      enqueue(fn, resolve)
    })
  }

  return generator
}
