var countSubstrings = function (s) {
  // dp[i][j] 代表s[i] 到 s[j] 是回文子串 为true  不是为false
  // 如果s[i] === s[j]
  // 当i === j的时候  比如 a  就一个字符 那么 此时dp[i][j] = true
  // 如果 j - i = 1 比如 aa 2个字符的时候 那么 dp[i][j] = true
  // 如果 j - i > 1  比如 abcba  3个字符的时候 那么 就需要看 dp[i+1][j-1] 是否是回文子串 也就是 bcb  如果dp[i+1][j-1]是 那么 dp[i][j] = true

  let dp = new Array(s.length)
    .fill(false)
    .map(() => new Array(s.length).fill(false))

  let result = 0
  // 因为dp[i][j] 依赖于 dp[i+1][j-1] 也就是 dp[i+1][j-1]在 dp[i][j] 的左下角   所以需要i倒着遍历
  for (let i = s.length - 1; i >= 0; i--) {
    // j 从i开始遍历 是因为 需要往后看 也就是 s[j] 是否和 s[i] 相等  因为j 需要向右移动
    for (let j = i; j < s.length; j++) {
      if (s[i] === s[j]) {
        if (i === j) {
          dp[i][j] = true
          result++
        } else if (j - i === 1) {
          dp[i][j] = true
          result++
        } else if (j - i > 1 && dp[i + 1][j - 1]) {
          dp[i][j] = true
          result++
        }
      }
    }
  }
  return result
}
