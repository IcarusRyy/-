function search(arr, target) {
  let count = 1
  let start = 0
  let end = arr.length - 1

  while (start <= end) {
    // 取出中间值
    let middle = Math.floor((start + end) / 2)
    let guess = arr[middle]
    console.log(count)
    // 如果目标值等于中间值
    if (guess === target) {
      return middle
    }
    if (guess > target) {
      end = middle
    }
    if (guess < target) {
      start = middle + 1
    }
    count++
  }
  return -1
}

let arr = [5, 2, 6, 3, 9, 8]

console.log(search(arr, 6))
