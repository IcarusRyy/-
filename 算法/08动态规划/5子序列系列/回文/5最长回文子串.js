var longestPalindrome = function (s) {
  let dp = new Array(s.length)
    .fill(false)
    .map(() => new Array(s.length).fill(false))

  let maxStr = ""

  for (let i = s.length - 1; i >= 0; i--) {
    for (let j = i; j < s.length; j++) {
      if (s[i] === s[j]) {
        if (j - i <= 1 || dp[i + 1][j - 1]) {
          dp[i][j] = true
          if (j - i + 1 > maxStr.length) {
            maxStr = s.substring(i, j + 1)
          }
        }
      }
    }
  }
  return maxStr
}
