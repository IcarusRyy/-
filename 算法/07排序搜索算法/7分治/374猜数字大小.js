// 二分搜索
// var guessNum = function (n) {
//   let low = 1
//   let high = n

//   while (low <= high) {
//     const mid = Math.floor((low + high) / 2)

//     const res = guess(mid)
//     if (res === 0) {
//       return mid
//     } else if (res === 1) {
//       low = mid + 1
//     } else {
//       high = mid - 1
//     }
//   }
// }

// 分治
var guessNum = function (n) {
  const fn = (low, high) => {
    const mid = Math.floor((low + high) / 2)
    const res = guess(mid)
    if (res === 0) {
      return mid
    } else if (res === 1) {
      return fn(mid + 1, high)
    } else {
      return fn(low, mid - 1)
    }
  }
  return fn(1, n)
}
