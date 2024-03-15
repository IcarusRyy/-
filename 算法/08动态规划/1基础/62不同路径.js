let dp = new Array(3).fill(1).map(() => new Array(2).fill(1))
console.log(dp)
var uniquePaths = function (m, n) {
  // 二维矩阵 所以定义二维dp数组
  // dp[i][j] 含义 走到(i,j)有多少种路径
  let dp = new Array(m).fill(1).map(() => new Array(n).fill(1))

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
    }
  }
  return dp[m - 1][n - 1]
}
