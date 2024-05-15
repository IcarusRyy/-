function concurrentLimit(max = 4) {
  let queue = []

  let activeCount = 0

  // 执行下一个任务
  const next = function () {
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
      if (queue.length > 0 && activeCount < max) {
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

const asyncTask = (val, daily) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(val, "val")
      resolve(val)
    }, daily)
  })
}

const limit = concurrentLimit(2)

// const res = (() => {
//   return [1, 2, 3, 4, 5, 6].map((item) => limit(() => test(item)))
// })()
// console.log(Promise.all(res), "res")

const tasks = [
  () => asyncTask(1, 1000),
  () => asyncTask(2, 500),
  () => asyncTask(3, 1500),
  () => asyncTask(4, 700),
  () => asyncTask(5, 300),
  () => asyncTask(6, 800),
  () => asyncTask(7, 1200),
  () => asyncTask(8, 400),
]

const runTime = async () => {
  const res = await Promise.all(tasks.map((item) => limit(item)))
  console.log(res, "res")
}
runTime()
