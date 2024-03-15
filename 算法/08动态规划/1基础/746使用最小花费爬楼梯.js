var minCostClimbingStairs = function (cost) {
  // dp[i] 到达下标i的位置所需要的最小花费
  let dp = [0, 0]
  for (let i = 2; i <= cost.length; i++) {
    dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2])
  }
  console.log(dp, "dp")
  return dp[cost.length]
}

console.log(minCostClimbingStairs([10, 15, 20]))
