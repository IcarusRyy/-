function concurrentLimit(max = 4) {
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
      if (activeCount < max && queue.length) {
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

const test = (i) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(i)
      resolve(i)
    }, 1000)
  })
}

const limit = concurrentLimit(2)
;(() => {
  ;[1, 2, 3, 4, 5, 6].map((i) => limit(() => test(i)))
})()
