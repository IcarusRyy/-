function mergeSort(arr) {
  if (arr.length < 2) return arr

  let mid = Math.floor(arr.length / 2)

  let merge = function (leftArr, rightArr) {
    console.log(leftArr, rightArr)
    let result = []
    while (leftArr.length && rightArr.length) {
      result.push(
        leftArr[0] <= rightArr[0] ? leftArr.shift() : rightArr.shift()
      )
    }
    return result.concat(leftArr).concat(rightArr)
  }
  return merge(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid)))
}

let arr = [5, 2, 6, 3, 9, 8]

console.log(mergeSort(arr))

// let arr1 = [1, 2, 3, 4, 5]
// slice 左闭右开区间
// console.log(arr1.slice(0, 3))

// let merge = function (leftArr, rightArr) {
//   console.log(leftArr, rightArr)
//   let result = []
//   while (leftArr.length && rightArr.length) {
//     // 主要是通过这里来进行归并的  因为shift会改变原数组
//     result.push(leftArr[0] <= rightArr[0] ? leftArr.shift() : rightArr.shift())
//   }
//   return result.concat(leftArr).concat(rightArr)
// }

// console.log(merge([2, 5, 6], [3, 8, 9]))
