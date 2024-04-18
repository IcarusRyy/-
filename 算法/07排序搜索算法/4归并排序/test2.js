function mergerArr(arr) {
  if (arr.length < 2) return arr
  let mid = Math.floor(arr.length / 2)
  let merge = function (left, right) {
    let result = []
    while (left.length && right.length) {
      result.push(left[0] <= right[0] ? left.shift() : right.shift())
    }
    return result.concat(left).concat(right)
  }
  return merge(mergerArr(arr.slice(0, mid)), mergerArr(arr.slice(mid)))
}

console.log(mergerArr([2, 1]))
