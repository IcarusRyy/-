function zip() {
  // 从arguments对象获取所有的数组
  let arrs = Array.from(arguments)

  // 获取最长的数组长度
  let maxLength = Math.max(...arrs.map((arr) => arr.length))

  // 创建一个新的数组以容纳结果
  let result = Array(maxLength)
    .fill()
    .map(() => Array(arrs.length))

  // 对每一个数组进行遍历，并将对应元素添加到结果中
  for (let i = 0; i < maxLength; i++) {
    for (let j = 0; j < arrs.length; j++) {
      result[i][j] = arrs[j][i]
    }
  }

  return result
}

zip(["a", "b"], [1, 2], [true, false])
// => [['a', 1, true], ['b', 2, false]]
