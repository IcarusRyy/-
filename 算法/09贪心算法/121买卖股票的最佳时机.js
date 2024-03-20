//  贪心算法
var maxProfit = function (prices) {
  let dp = [0]
  let result = 0
  let minPrice = prices[0]
  for (let i = 1; i < prices.length; i++) {
    if (minPrice > prices[i]) {
      minPrice = prices[i]
    }
    dp[i] = prices[i] - minPrice
    result = Math.max(result, dp[i])
  }
  return result
}
