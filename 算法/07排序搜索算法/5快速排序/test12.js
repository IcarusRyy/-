const quickArr = function (arr) {
  let mid = Math.floor(arr.length / 2)
  let pivot = arr[mid]

  let left = []
  let right = []

  for (let i = 0; i < arr.length; i++) {
    if (pivot === arr[i]) continue
    if (arr[i] > pivot) {
      right.push(arr[i])
    } else {
      left.push(arr[i])
    }
  }
  return quickArr(left).concat(pivot, quickArr(right))
}
