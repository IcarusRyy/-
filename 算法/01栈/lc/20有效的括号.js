/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const arr = []
  const map = {
    ")": "(",
    "]": "[",
    "}": "{",
  }
  for (let i = 0; i < s.length; i++) {
    const str = s[i]
    // 如果是闭括号
    if (map[str]) {
      // 如果这个闭括号 对应的开括号 不等于 数组的第一项的开括号 那么直接返回false跳出循环
      if (map[str] !== arr.pop()) {
        return false
      }
    } else {
      arr.push(str)
    }
  }
  return !arr.length
}
