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

let arr = [27, 3, 5, 1, 22, 33, 45, 12, 122, 21]
console.log(insertArr(arr))
