function quickSort(arr) {
  if (arr.length < 2) return arr

  let mid = Math.floor(arr.length / 2)

  // 基准值
  let pivot = arr.splice(mid, 1)[0]

  let left = []
  let right = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat([pivot], quickSort(right))
}
