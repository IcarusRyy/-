export const pLimit = (concurrency) => {
  // 验证并发数值是否合法
  if (
    !(Number.isInteger(concurrency) || concurrency === Infinity) ||
    concurrency <= 0
  ) {
    throw new TypeError("Expected `concurrency` to be a number from 1 and up")
  }

  const queue = [] // 待执行的队列
  let activeCount = 0 // 正在执行的数量

  // 执行队列中的下一个任务
  const next = () => {
    // 标记正在执行的数量减1
    activeCount--

    // 只要队列还有需要执行的函数，就出列run函数执行
    if (queue.length > 0) {
      queue.shift()()
    }
  }

  // 封装异步任务执行逻辑
  const run = async (fn, resolve) => {
    // 标记正在执行的数量加1
    activeCount++

    // 执行fn
    // 利用async包裹执行，让函数报错了只会报Uncaught (in promise) Error，但不会影响其他代码执行
    const result = (async () => fn())()

    // 将限流函数返回的promise状态改为已完成且结果是fn的执行结果
    // 这里就是使用时，limit包裹一层依然能得到相同的promise结果的关键
    resolve(result)

    // 捕捉上面所说的可能发生会报的Uncaught (in promise) Error，让执行彻底不会抛出异常
    // await让result执行完后，再执行next函数
    try {
      await result
    } catch {}

    next()
  }

  const enqueue = (fn, resolve) => {
    // 1.入列：将函数fn的执行让run函数接管，并通过bind函数包裹一层，放入到queue队列中
    // 将任务封装成函数 bind的作用就是让函数run先不要执行，只是入列，在出列后再执行 bind是返回一个函数
    const task = run.bind(null, fn, resolve)
    queue.push(task)

    // 延时
    ;(async () => {
      // 2.延时：这个延时是通过Promise来实现微任务延时，让下面的出列操作单次循环的微任务之后，
      // 作用就是让你可以一次性多次执行限流函数入列，会等待你全部同步入列后才会执行下面的出列操作
      await Promise.resolve()

      // 3.出列：判断正在执行的数量没有超出限制就出列run函数并执行
      if (activeCount < concurrency && queue.size > 0) {
        queue.shift()()
      }
    })()
  }

  // 创建限制器函数，每次调用返回一个新的 Promise
  const generator = (fn, ...args) =>
    new Promise((resolve) => {
      enqueue(fn, resolve, ...args)
    })

  // 为限制器添加额外的属性，用于监控状态
  // Object.defineProperties(generator, {
  //   activeCount: { get: () => activeCount },
  //   pendingCount: { get: () => queue.length },
  //   clearQueue: {
  //     value: () => {
  //       queue.length = 0
  //     },
  //   },
  // })

  return generator
}
