function currentLimit(max) {
  if (!max) {
    new TypeError("error")
  }

  let queue = []
  let activeCount = 0

  // 调用下一次执行
  const next = () => {
    activeCount--
    if (queue.length > 0) {
      const task = queue.shift()
      task()
    }
  }

  // 任务执行
  const run = async (fn, resolve) => {
    activeCount++

    const result = (async () => fn())()

    // 对外暴露promise
    resolve(result)

    try {
      await result
    } finally {
      next()
    }
  }

  // 任务队列管理
  const enqueue = (fn, resolve) => {
    // 创建任务
    const task = run.bind(null, fn, resolve)
    queue.push(task)
    ;// 检查当前任务是否达到最大值
    (async () => {
      await Promise.resolve()

      if (activeCount < max && queue.length > 0) {
        const task = queue.shift()
        task()
      }
    })()
  }

  // 生成器
  const generator = (fn) => {
    return new Promise((resolve) => enqueue(fn, resolve))
  }

  return generator
}
