function zip(...args) {
  // 从arguments对象转为数组
  let arrs = Array.from(args)
  // 获取元素的数组长度
  let len = args[0].length
  let res = new Array(len).fill().map(() => new Array(arrs.length))
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < arrs.length; j++) {
      res[i][j] = arrs[j][i]
    }
  }
  return res
}
console.log(zip(["a", "b"], [1, 2], [true, false]))
