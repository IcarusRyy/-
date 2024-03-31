var coinChange = function (coins, amount) {
  let dp = new Array(amount + 1).fill(amount + 1)

  for (let i = 0; i < coins.length; i++) {
    for (let j = coins[i]; j <= amount; j++) {
      dp[j] = Math.min(dp[j], dp[j - coins[i]] + 1)
    }
  }
  return dp[amount] === amount + 1 ? -1 : dp[amount]
}
