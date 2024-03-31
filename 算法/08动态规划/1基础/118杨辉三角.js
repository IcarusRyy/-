var generate = function (numRows) {
  let dp = []

  for (let i = 0; i < numRows; i++) {
    dp[i] = new Array(i + 1).fill(1)
    for (let j = 1; j < i; j++) {
      dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j]
    }
  }
  return dp
}

console.log(generate(5))
