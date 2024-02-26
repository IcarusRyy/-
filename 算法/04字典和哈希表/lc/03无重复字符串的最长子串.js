// 滑动窗口
var lengthOfLongestSubstring = function (s) {
  let maxStr = ""
  let res = 0
  let start = 0 // 用于记录当前无重复子串的起始位置

  for (let i = 0; i < s.length; i++) {
    const index = maxStr.indexOf(s[i])

    if (index !== -1) {
      // 如果当前字符已存在于maxStr中，更新start为上一次出现该字符位置的下一个位置
      start = start + index + 1
    }
    // 更新maxStr为当前的无重复子串
    maxStr = s.substring(start, i + 1)
    // 更新结果
    res = Math.max(res, maxStr.length)
  }
  return res
}
