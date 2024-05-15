// 分治
// 取一个基准值 然后分成左右两部分 左边的都比基准值小 右边的都比基准值大
function quickArr(arr) {
  if (arr.length < 2) return arr
  let mid = Math.floor(arr.length / 2)
  let pivot = arr[mid]
  let left = [],
    right = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === pivot) continue
    if (arr[i] > pivot) {
      right.push(arr[i])
    } else {
      left.push(arr[i])
    }
  }
  return quickArr(left).concat(pivot, quickArr(right))
}

let arr = [2, 1, 5, 4, 23, 3, 6, 12]
console.log(quickArr(arr))
