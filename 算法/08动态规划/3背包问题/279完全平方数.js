var numSquares = function (n) {
  let dp = new Array(n + 1).fill(n + 1)
  dp[0] = 0
  // 先遍历物品 再遍历背包
  for (let i = 1; i < n + 1; i++) {
    for (let j = i ** 2; j <= n; j++) {
      dp[j] = Math.min(dp[j], dp[j - i ** 2] + 1)
    }
  }
  return dp[n]
}
