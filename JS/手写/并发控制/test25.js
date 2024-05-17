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

  // 执行函数
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

const test = (val, wait) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(val)
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

const limit = concurrentLimit()

const runTime = async () => {
  const res = await Promise.all(tasks.map((item) => limit(item)))
  console.log(res)
}

runTime()
