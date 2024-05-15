// 分治
// 将数组分成较小的子数组 然后将这些子数组 组成有序数组
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

let arr = [27, 3, 5, 1, 22, 33, 45, 12, 122, 21]
console.log(mergeArr(arr))
