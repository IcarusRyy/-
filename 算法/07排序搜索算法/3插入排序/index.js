// function insertSort(arr) {
//   let len = arr.length

//   for (let i = 1; i < len; i++) {
//     let temp = arr[i]
//     let j = i - 1 // 默认已排序的元素
//     // 在已经排序号的队列 进行从后往前扫描
//     while (j >= 0 && arr[j] > temp) {
//       // 已经排序的元素 大于 新元素，将该元素移动到下一个为位置
//       arr[j + 1] = arr[j]
//       j--
//     }
//     arr[j + 1] = temp
//   }
//   return arr
// }

// let arr = [5, 2, 6, 3, 9, 8]
// console.log(insertSort(arr))

function insertSort(arr) {
  let len = arr.length

  for (let i = 1; i < len; i++) {
    let temp = arr[i] // 3 5
    let j = i - 1 // 0 1
    while (j >= 0 && arr[j] < temp) {
      // 1 < 5
      // 1 < 3
      arr[j + 1] = arr[j] // [1, 1, 5]  [3,1,1] [3,3,1]
      j-- // -1 0 -1
    }
    arr[j + 1] = temp // arr[-1 + 1] = 3  => [3,1,5]    [5,3,1]
  }
  return arr
}

let arr = [1, 3, 5]
console.log(insertSort(arr))
