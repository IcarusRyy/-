var longestCommonSubsequence = function (text1, text2) {
  // dp[i][j] 代表着 以text1[i] 和 text2[j] 为结尾的最长公共子序列的长度

  // 如果text[i - 1] === text[j - 1] 那么 dp[i][j] = dp[i - 1][j - 1] + 1

  // 如果不相等 那么 dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])

  // 使用length+1 主要是为了增加text1 或者 text2 为空字符串的情况
  let dp = new Array(text1.length + 1)
    .fill(0)
    .map(() => new Array(text2.length + 1).fill(0))

  for (let i = 1; i <= text1.length; i++) {
    for (let j = 1; j <= text2.length; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }
  return dp[text1.length][text2.length]
}

console.log(longestCommonSubsequence("abcde", "ace"))
