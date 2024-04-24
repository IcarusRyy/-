function insertArr(arr) {
  for (let i = 0; i < arr.length; i++) {
    let temp = arr[i]
    let j = i - 1
    while (j >= 0 && arr[j] > temp) {
      arr[j + 1] = arr[j]
      j--
    }
    arr[j + 1] = temp
  }
  return arr
}
let arr = [5, 2, 6, 3, 9, 8]
console.log(insertArr(arr))
