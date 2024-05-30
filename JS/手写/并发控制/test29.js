function concurrentLimit(max = 2) {
  let queue = []
  let activeCount = 0

  // 执行下一个任务
  const next = function () {
    activeCount--
    if (queue.length > 0) {
      const task = queue.shift()
      task()
    }
  }

  // 执行任务
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
  let enqueue = function (fn, resolve) {
    const task = run.bind(null, fn, resolve)
    queue.push(task)
    ;(async () => {
      await Promise.resolve()
      if (queue.length > 0 && activeCount < max) {
        const next = queue.shift()
        next()
      }
    })()
  }

  // 构造器
  let generator = function (fn) {
    return new Promise((resolve) => {
      enqueue(fn, resolve)
    })
  }

  return generator
}

console.log(1)
setTimeout(() => {
  console.log(3)
}, 2000)
setTimeout(() => {
  console.log(2)
}, 1000)
console.log(4)
