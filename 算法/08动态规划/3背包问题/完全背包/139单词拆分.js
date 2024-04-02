var wordBreak = function (s, wordDict) {
  // 完全背包问题
  // dp[j] 指的是 长度为j的字符串 是否可以拆分 也就是是否可以被wordDict 中的单词组成

  // 初始化
  let dp = new Array(s.length + 1).fill(false)
  dp[0] = true

  // 因为这个是求排列数的值  有严格顺序要求 所以是先遍历背包
  for (let i = 1; i < s.length + 1; i++) {
    for (let j = 0; j < wordDict.length; j++) {
      if (i >= wordDict[j].length) {
        if (
          dp[i - wordDict[j].length] &&
          s.slice(i - wordDict[j].length, i) === wordDict[j]
        ) {
          dp[i] = true
        }
      }
    }
  }
  return dp[s.length]
}
