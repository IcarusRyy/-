function quickSort(arr) {
  if (arr.length < 2) return arr

  let mid = Math.floor(arr.length / 2)

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

let arr = [5, 2, 6, 3, 9, 8]

console.log(quickSort(arr))
