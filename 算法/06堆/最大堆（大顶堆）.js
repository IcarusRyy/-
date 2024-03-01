// 升序使用大顶堆

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
