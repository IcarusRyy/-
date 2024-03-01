// class MinHeap {
//   constructor() {
//     this.heap = []
//   }
//   // 获取左侧子节点
//   getLeftIndex(index) {
//     return index * 2 + 1
//   }

//   // 获取右侧子节点
//   getRightIndex(index) {
//     return index * 2 + 2
//   }
//   // 找到父节点
//   getParentIndex(index) {
//     return Math.floor((index - 1) / 2)
//   }
//   // 互换位置
//   swap(parentIndex, index) {
//     const temp = this.heap[parentIndex]
//     this.heap[parentIndex] = this.heap[index]
//     this.heap[index] = temp
//   }

//   // 位置上移操作 （往前移动）
//   up(index) {
//     // 如果一开始是0或者移动到0了 就不移动
//     if (index === 0) return

//     // 取父节点index
//     const parentIndex = this.getParentIndex(index)
//     // 如果父元素大于当前元素，就开始移动
//     if (this.heap[parentIndex] > this.heap[index]) {
//       // 互换位置
//       this.swap(parentIndex, index)
//       // 可能会换多次
//       this.up(parentIndex)
//     }
//   }
//   // 下移操作 往后移
//   down(index) {
//     const leftIndex = this.getLeftIndex(index)
//     const rightIndex = this.getRightIndex(index)
//     if (this.heap[leftIndex] < this.heap[index]) {
//       this.swap(leftIndex, index)
//       this.down(leftIndex)
//     }
//     if (this.heap[rightIndex] < this.heap[index]) {
//       this.swap(rightIndex, index)
//       this.down(rightIndex)
//     }
//   }

//   // 添加元素
//   insert(val) {
//     this.heap.push(val)
//     this.up(this.heap.length - 1)
//   }
//   // 删除堆顶
//   pop() {
//     this.heap[0] = this.heap.pop()
//     this.down(0)
//   }
//   // 获取堆顶
//   peek() {
//     return this.heap[0]
//   }
//   // 获取堆长度
//   size() {
//     return this.heap.length
//   }
// }
// /**
//  * @param {number[]} nums
//  * @param {number} k
//  * @return {number}
//  */
// var findKthLargest = function (nums, k) {
//   const arr = new MinHeap()
//   for (let i = 0; i < nums.length; i++) {
//     arr.insert(nums[i])
//     if (arr.size() > k) {
//       arr.pop()
//     }
//   }
//   return arr.peek()
// }

class MaxHeap {
  constructor() {
    this.heap = []
  }

  // 获取左侧子节点
  getLeftIndex(index) {
    return 2 * index + 1
  }

  // 获取右侧子节点
  getRightIndex(index) {
    return 2 * index + 2
  }

  // 找到父节点
  getParentIndex(index) {
    if (index === 0) {
      return undefined // 根节点没有父节点
    }
    return Math.floor((index - 1) / 2)
  }

  // 互换位置
  swap(indexOne, indexTwo) {
    const temp = this.heap[indexOne]
    this.heap[indexOne] = this.heap[indexTwo]
    this.heap[indexTwo] = temp
  }

  // 位置上移操作（往前移动）
  up(index) {
    let parentIndex = this.getParentIndex(index)
    while (index > 0 && this.heap[parentIndex] < this.heap[index]) {
      this.swap(parentIndex, index)
      index = parentIndex
      parentIndex = this.getParentIndex(index)
    }
  }

  // 下移操作（往后移）
  down(index) {
    let largest = index
    const leftIndex = this.getLeftIndex(index)
    const rightIndex = this.getRightIndex(index)

    if (leftIndex < this.size() && this.heap[leftIndex] > this.heap[largest]) {
      largest = leftIndex
    }
    if (
      rightIndex < this.size() &&
      this.heap[rightIndex] > this.heap[largest]
    ) {
      largest = rightIndex
    }
    if (largest !== index) {
      this.swap(index, largest)
      this.down(largest)
    }
  }

  // 添加元素
  insert(value) {
    this.heap.push(value)
    this.up(this.heap.length - 1)
  }

  // 删除堆顶
  pop() {
    if (this.size() === 0) {
      return undefined
    }
    const result = this.heap[0]
    const end = this.heap.pop()
    if (this.size() !== 0) {
      this.heap[0] = end
      this.down(0)
    }
    return result
  }

  // 获取堆顶
  peek() {
    return this.heap[0]
  }

  // 获取堆大小
  size() {
    return this.heap.length
  }
}

var findKthLargest = function (nums, k) {
  const maxHeap = new MaxHeap()
  // 将所有元素插入到大顶堆中
  nums.forEach((num) => maxHeap.insert(num))
  // 移除k-1次堆顶元素
  for (let i = 0; i < k - 1; i++) {
    maxHeap.pop()
  }
  // 第k次的堆顶元素即为第k大的元素
  return maxHeap.peek()
}
