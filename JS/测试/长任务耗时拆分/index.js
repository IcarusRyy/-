// 模拟 X6 的 resetCells 方法
function resetCells(cells) {
  // 假设这个方法会更新多个单元格，并且执行时间较长
  cells.forEach((cell) => {
    // 模拟每个单元格的更新操作
    console.log("Updating cell:", cell)
    // 这里可以是实际的单元格更新操作，如 cell.update()
  })
}

// 将 resetCells 拆分成小任务并在空闲时间执行
function processResetCellsInIdleTime(cells, chunkSize = 10) {
  function processChunk(deadline) {
    // 如果时间未用尽，且任务未完成
    while (deadline.timeRemaining() > 0 && cells.length > 0) {
      // 处理一块数据
      const chunk = cells.splice(0, chunkSize)
      resetCells(chunk)
    }

    // 如果任务未完成，继续请求下一个空闲回调
    if (cells.length > 0) {
      requestIdleCallback(processChunk)
    }
  }

  // 初始请求空闲回调
  requestIdleCallback(processChunk)
}

// 示例使用
const cells = Array.from({ length: 100 }, (_, i) => ({ id: i + 1 })) // 模拟大量单元格
processResetCellsInIdleTime(cells)

// 超时
// 模拟 X6 的 resetCells 方法
function resetCells(cells) {
  // 假设这个方法会更新多个单元格，并且执行时间较长
  cells.forEach((cell) => {
    // 模拟每个单元格的更新操作
    console.log("Updating cell:", cell)
    // 这里可以是实际的单元格更新操作，如 cell.update()
  })
}

// 将 resetCells 拆分成小任务并在空闲时间执行
function processResetCellsInIdleTime(cells, chunkSize = 10, timeout = 1000) {
  function processChunk(deadline) {
    // 如果时间未用尽，且任务未完成
    while (
      (deadline.timeRemaining() > 0 || deadline.didTimeout) &&
      cells.length > 0
    ) {
      // 处理一块数据
      const chunk = cells.splice(0, chunkSize)
      resetCells(chunk)
    }

    // 如果任务未完成，继续请求下一个空闲回调
    if (cells.length > 0) {
      requestIdleCallback(processChunk, { timeout })
    }
  }

  // 初始请求空闲回调
  requestIdleCallback(processChunk, { timeout })
}

// 示例使用
const cells = Array.from({ length: 100 }, (_, i) => ({ id: i + 1 })) // 模拟大量单元格
processResetCellsInIdleTime(cells)
