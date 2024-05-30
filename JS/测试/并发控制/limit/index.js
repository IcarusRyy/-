function concurrentLimit(max = 2) {
  let queue = [],
    activeCount = 0

  // 执行下一个任务
  let next = function () {
    activeCount--
    if (queue.length) {
      const nextTask = queue.shift()
      nextTask()
    }
  }

  // 执行任务
  let run = async function (fn, resolve) {
    activeCount++
    let result = (async () => fn())()
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
  () => test(2, 500),
  () => test(3, 100),
  () => test(4, 200),
]

const limit = concurrentLimit()
const runTime = async function () {
  const res = await Promise.all(tasks.map((task) => limit(task)))
  console.log(res)
}

runTime()
