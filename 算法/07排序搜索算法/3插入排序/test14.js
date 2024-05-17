function insertArr(arr) {
  if (arr.length < 2) return arr
  for (var i = 0; i < arr.length; i++) {
    let j = i - 1
    let temp = arr[i]
    while (j >= 0 && arr[j] > temp) {
      arr[j + 1] = arr[j]
      j--
    }
    arr[j + 1] = temp
  }
  return arr
}
let arr = [27, 3, 5, 1, 22, 33, 45, 12, 122, 21]
console.log(insertArr(arr))
