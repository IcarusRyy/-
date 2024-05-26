function memoize(fn) {
  const cache = new Map()

  return function (...args) {
    const key = JSON.stringify(args)

    if (cache.has(key)) {
      return cache.get(key)
    }

    const result = fn.apply(this, args)
    cache.set(key, result)
    return result
  }
}

// 示例函数：计算一个数字的平方
function square(n) {
  console.log(`Calculating square of ${n}`)
  return n * n
}

// 使用 memoize 函数对 square 进行记忆化
const memoizedSquare = memoize(square)

console.log(memoizedSquare(4)) // Calculating square of 4, 输出: 16
console.log(memoizedSquare(4)) // 直接输出缓存结果: 16
console.log(memoizedSquare(5)) // Calculating square of 5, 输出: 25
console.log(memoizedSquare(5)) // 直接输出缓存结果: 25
