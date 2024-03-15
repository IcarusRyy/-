// 0 1 1 2 3 5 8
var fib = function (n) {
  if (n < 2) return n
  let dp = [0, 1]
  // 因为要求第n个，所以要小于等于n
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n]
}
