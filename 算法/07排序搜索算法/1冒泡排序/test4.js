function arrSort(arr) {
  if (arr.length < 2) return arr
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
  return arr
}
let arr = [27, 3, 5, 1, 22, 33, 45, 12, 122, 21]
console.log(arrSort(arr))
