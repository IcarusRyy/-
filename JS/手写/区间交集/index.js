function getIntersection(...intervals) {
  if (intervals.length === 0) return null

  // 规范化区间，确保起点 <= 终点
  intervals = intervals.map((interval) => {
    let [start, end] = interval
    return start <= end ? [start, end] : [end, start]
  })

  // 初始化交集区间
  let [start, end] = intervals[0]

  // 遍历所有区间，计算交集
  for (let i = 1; i < intervals.length; i++) {
    let [curStart, curEnd] = intervals[i]
    start = Math.max(start, curStart)
    end = Math.min(end, curEnd)

    // 如果交集无效，返回 null
    if (start > end) return null
  }

  // 返回有效的交集区间
  return [start, end]
}

// 测试用例
console.log(getIntersection([2, 5], [3, 7], [4, 6])) // [4, 5]
console.log(getIntersection([1, 3], [5, 8])) // null
console.log(getIntersection([5, 2], [6, 1])) // [2, 5]
console.log(getIntersection([2, 2], [2, 2])) // [2, 2]
console.log(getIntersection([1, 4], [2, 6], [3, 5])) // [3, 4]
console.log(getIntersection([2, 3], [3, 4], [4, 5])) // null
