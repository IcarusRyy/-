function concurrentLimit(max = 4) {
  let queue = []
  let activeCount = 0

  // 调用下一个任务
  const next = function () {
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

// 应用
const test = (val, delay) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(val, "val")
      resolve(val)
    }, delay)
  })
}

const tasks = [
  () => test(1, 1000),
  () => test(2, 500),
  () => test(3, 1500),
  () => test(4, 300),
  () => test(5, 800),
  () => test(6, 2000),
]

const limit = concurrentLimit(2)

const runTime = async () => {
  const res = await Promise.all(tasks.map((task) => limit(() => task())))
  console.log(res, "res")
}

// 2 1 4 3 5 6
runTime()
