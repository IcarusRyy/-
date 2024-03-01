// 升序
function sortMin(arr) {
  let minIndex = 0
  for (let i = 0; i < arr.length - 1; i++) {
    minIndex = i
    // 从下一个元素开始循环
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    const temp = arr[i]
    arr[i] = arr[minIndex]
    arr[minIndex] = temp
  }
  return arr
}

let arr = [27, 3, 5, 1]
console.log(sortMin(arr))

let test = [3, 1, 4]
for (let i = 0; i < test.length - 1; i++) {
  console.log(test[i], i)
}

// 降序

function sortMax(arr) {
  let maxIndex = 0

  for (let i = 0; i < arr.length - 1; i++) {
    maxIndex = i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] > arr[maxIndex]) {
        maxIndex = j
      }
    }
    const temp = arr[i]
    arr[i] = arr[maxIndex]
    arr[maxIndex] = temp
  }
  return arr
}

let arrMax = [27, 3, 5, 1]
console.log(sortMax(arrMax))
