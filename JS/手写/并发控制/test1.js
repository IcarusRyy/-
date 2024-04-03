function pLimit(max) {
  if (!max) {
    throw new TypeError("Expected `max` to be a number")
  }

  let queue = []
  let activeCount = 0

  // 调用执行下一个任务
  const next = () => {
    activeCount--

    if (queue.length > 0) {
      queue.shift()()
    }
  }

  // 执行函数
  const run = async (fn, resolve) => {
    activeCount++

    // 执行fn 返回一个promise
    const result = (async () => fn())()

    // 对外暴露请求结果
    resolve(result)

    try {
      // 需要等待当前这个任务返回的promise完成 才能进行下一个任务的执行
      await result
    } finally {
      next()
    }
  }

  // 队列管理
  const enqueue = (fn, resolve) => {
    // 创建任务
    const task = run.bind(null, fn, resolve)
    queue.push(task)
    ;// 检查当前队列是否还有任务 并且 当前正在执行的任务 是否小于 并发数
    (async () => {
      // 延时等待
      await Promise.resolve()

      if (activeCount < max && queue.length > 0) {
        const task = queue.shift()
        task()
      }
    })()
  }

  // 生成器
  const generator = (fn) => {
    return new Promise((resolve) => {
      enqueue(fn, resolve)
    })
  }

  return generator
}
