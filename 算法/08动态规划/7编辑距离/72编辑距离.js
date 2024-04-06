/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  // dp[i][j] 代表着word1的前i个字符和word2的前j个字符的编辑距离
  let dp = new Array(word1.length + 1)
    .fill(0)
    .map(() => new Array(word2.length + 1).fill(0))

  dp[0][0] = 0

  for (let i = 1; i < word1.length + 1; i++) {
    dp[i][0] = i
  }
  for (let j = 1; j < word2.length + 1; j++) {
    dp[0][j] = j
  }

  for (let i = 1; i < word1.length + 1; i++) {
    for (let j = 1; j < word2.length + 1; j++) {
      // 使用i-1 j-1 代表着当前字符  比如 ab 和 ac 因为i = 1 j=1的时候 我们刚开始遍历 所以i = 1 j = 1的时候 word1[0] 和 word2[0]
      if (word1[i - 1] === word2[j - 1]) {
        // 当结尾字符相同的时候 就代表不需要操作，所以和前面一个字符的编辑距离相同
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        // 插入 dp[i][j-1]
        // 删除 dp[i -1][j]
        // 替换 dp[i-1][j-1]
        // + 1 代表因为当前结尾字符不一样，所以要增加一步操作
        dp[i][j] = Math.min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]) + 1
      }
    }
  }
  return dp[word1.length][word2.length]
}
