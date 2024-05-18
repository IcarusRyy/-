function getIntersection(...arrs) {
  arrs = arrs.map((arr) => arr.sort((a, b) => a - b))
  let [start, end] = arrs[0]

  for (let i = 1; i < arrs.length; i++) {
    let [curStart, curEnd] = arrs[i]

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
