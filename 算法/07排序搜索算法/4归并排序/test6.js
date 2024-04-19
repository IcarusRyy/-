function mergeArr(arr) {
  if (arr.length < 2) return arr
  let mid = Math.floor(arr.length / 2)
  let merge = function (left, right) {
    let res = []
    while (left.length && right.length) {
      res.push(left[0] <= right[0] ? left.shift() : right.shift())
    }
    return res.concat(left).concat(right)
  }
  return merge(mergeArr(arr.slice(0, mid)), mergeArr(arr.slice(mid)))
}
