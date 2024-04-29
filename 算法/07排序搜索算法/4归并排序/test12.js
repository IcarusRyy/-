function mergeArr(arr) {
  if (arr.length < 2) return arr

  let mid = Math.floor(arr.length / 2)

  let merge = function (left, right) {
    let result = []
    while (left.length && right.length) {
      result.push(left[0] < right[0] ? left.shift() : right.shift())
    }
    return result.concat(left).concat(right)
  }

  return merge(mergeArr(arr.slice(0, mid)), mergeArr(arr.slice(mid)))
}

let arr = [2, 1, 5, 4, 23, 3, 6, 12]
console.log(mergeArr(arr))
