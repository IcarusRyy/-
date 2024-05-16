function scheduler(max = 2) {
  let queue = []
  let activeCount = 0

  // 调用下一个任务
  const next = () => {
    activeCount--
    if (queue.length) {
      const nextTask = queue.shift()
      nextTask()
    }
  }

  // 执行函数
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
    queue.push(task)
    ;(async () => {
      await Promise.resolve()
      if (queue.length > 0 && activeCount < max) {
        const nextTask = queue.shift()
        nextTask()
      }
    })()
  }

  // 构造器
  const generator = (fn) => {
    return new Promise((resolve) => {
      enqueue(fn, resolve)
    })
  }

  return generator
}

const test = (val, wait) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(val, "val")
      resolve(val)
    }, wait)
  })
}

const tasks = [
  () => test(1, 1000),
  () => test(2, 300),
  () => test(3, 500),
  () => test(4, 1500),
  () => test(5, 1200),
  () => test(6, 2000),
]

// 2 3 1 5 4 6

const limit = scheduler()

const runTask = async () => {
  const res = await Promise.all(tasks.map((item) => limit(item)))
  console.log(res, "res")
}

runTask()
