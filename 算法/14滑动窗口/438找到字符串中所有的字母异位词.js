/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
  let sArr = [],
    pArr = []

  let result = []

  // 先将p所有的字符 添加到pArr中
  for (let i = 0; i < p.length; i++) {
    pArr[p[i].charCodeAt() - "a".charCodeAt()]++
  }

  // i代表滑动窗口结束的位置
  for (let i = 0; i < s.length; i++) {
    // 将s字符串的每个字符 添加到sArr中
    sArr[s[i].charCodeAt() - "a".charCodeAt()]++

    // 如果i的大于p的长度，开始比较
    if (i >= p.length) {
      // 比如 s = abcd  p=abc 此时i=3 p.length = 3 开始比较 但是sArr包含四个字符的信息 所以要减去滑动窗口起始位置的信息
      // 减去滑动窗口开始位置的字符 窗口向右移动，去掉最左边的字符
      // 其实去掉的就是滑动窗口起始位置左边的那个字符 因为滑动窗口向前移动了一位
      sArr[s[i - p.length].charCodeAt() - "a".charCodeAt()]--
    }
    // 开始比较
    if (sArr.toString() === pArr.toString()) {
      // i - p.length +1 代表滑动窗口的起始位置
      // i - p.length 代表是滑动窗口起始位置 前面的那个字符
      result.push(i - p.length + 1)
    }
  }
  return result
}
