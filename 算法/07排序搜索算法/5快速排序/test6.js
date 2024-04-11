function quickSort(arr) {
  if (arr.length < 2) return arr
  let mid = Math.floor(arr.length / 2)
  let pivot = arr[mid]

  let left = []
  let right = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === pivot) continue
    if (arr[i] > pivot) {
      right.push(arr[i])
    } else {
      left.push(arr[i])
    }
  }
  return quickSort(left).concat(pivot, quickSort(right))
}
