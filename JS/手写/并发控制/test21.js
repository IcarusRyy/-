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

const test = (val, daily) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(val, "val")
      resolve(val)
    }, daily)
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

const limit = concurrentLimit(2)

Promise.myAll = function (arr) {
  let res, rej
  const p = new Promise((resolve, reject) => {
    res = resolve
    rej = reject
  })
  let i = 0
  let result = []
  for (let item of arr) {
    Promise.resolve(item).then((data) => {
      const index = i
      i++
      result[index] = data
      if (i === arr.length) {
        res(result)
      }
    }, rej)
  }
  return p
}

const runTime = async () => {
  const res = await Promise.myAll(tasks.map((fn) => limit(() => fn())))
  console.log(res, "res")
}

// 2,3,1,5,4,6
runTime()
