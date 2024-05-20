function getIntersection(...args) {
  arr = args.map((item) => item.sort((a, b) => a - b))
  let [start, end] = arr[0]
  for (let item of arr) {
    let [curStart, curEnd] = item
    start = Math.max(start, curStart)
    end = Math.min(end, curEnd)
    if (start > end) return null
  }
  return [start, end]
}
console.log(getIntersection([2, 5], [3, 7], [4, 6])) // [4, 5]
console.log(getIntersection([1, 3], [5, 8])) // null
console.log(getIntersection([5, 2], [6, 1])) // [2, 5]
console.log(getIntersection([2, 2], [2, 2])) // [2, 2]
console.log(getIntersection([1, 4], [2, 6], [3, 5])) // [3, 4]
console.log(getIntersection([2, 3], [3, 4], [4, 5])) // null
