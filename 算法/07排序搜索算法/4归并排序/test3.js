function mergeArr(arr) {
  if (arr.length < 2) return arr
  let mid = Math.floor(arr.length / 2)

  let merge = function (left, right) {
    let result = []
    while (left.length && right.length) {
      result.push(left[0] <= right[0] ? left.shift() : right.shift())
    }
    return result
  }
  return merge(mergeArr(arr.slice(0, mid)), mergeArr(arr.slice(mid)))
}
