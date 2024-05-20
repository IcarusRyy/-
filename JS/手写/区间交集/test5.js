function getIntersection(...args) {
  let arr = args.map((item) => item.sort((a, b) => a - b))

  let [start, end] = arr[0]
  for (let item of arr) {
    let [curStart, curEnd] = item
    start = Math.max(curStart, start)
    end = Math.min(curEnd, end)
    if (start > end) return null
  }
  return [start, end]
}
