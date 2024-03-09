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
