var findContentChildren = function (g, s) {
  // g 代表孩子的胃口
  // s 代表饼干的尺寸

  let arr = g.sort((a, b) => a - b)
  let brr = s.sort((a, b) => a - b)

  // 初始值
  let num = 0

  // 遍历饼干尺寸
  brr.forEach((val) => {
    if (val >= arr[num]) {
      num++
    }
  })

  return num
}

console.log(findContentChildren([3, 4, 5], [1, 2, 3]))
