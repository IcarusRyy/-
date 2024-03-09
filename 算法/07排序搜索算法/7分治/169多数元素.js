// 分治
var majorityElement = function (nums) {
  const countInRang = (start, end, num) => {
    let count = 0

    for (let i = start; i < end; i++) {
      if (nums[i] === num) {
        count++
      }
    }
    return count
  }
  const majority = (start, end) => {
    if (start === end) return nums[start]

    let mid = start + Math.floor((end - start) / 2)

    // 左侧部分众数
    const l = majority(start, mid)
    // 右侧部分众数
    const r = majority(mid + 1, end)
    if (l === r) {
      return l
    }
    // 合并然后去找
    const l_count = countInRang(start, end + 1, l)
    const r_count = countInRang(start, end + 1, r)
    return l_count > r_count ? l : r
  }
  return majority(0, nums.length - 1)
}
