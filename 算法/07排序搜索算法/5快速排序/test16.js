function quickArr(arr) {
  if (arr.length < 2) return arr

  let mid = Math.floor(arr.length / 2)
  let pivot = arr[mid]

  let left = []
  let right = []

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === pivot) continue
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickArr(left).concat(pivot, quickArr(right))
}

let arr = [27, 3, 5, 1, 22, 33, 45, 12, 122, 21]
console.log(quickArr(arr))
