var integerBreak = function (n) {
  if (n < 3) return 1
  // dp[i] 就是i拆分后 最大的乘积
  let dp = [0, 0, 1]

  for (let i = 3; i <= n; i++) {
    dp[i] = 0
    for (let j = 1; j <= i; j++) {
      dp[i] = Math.max(j * (i - j), j * dp[i - j], dp[i])
    }
  }
  return dp[n]
}

console.log(integerBreak(10))
