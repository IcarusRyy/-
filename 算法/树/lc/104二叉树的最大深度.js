//  递归
var maxDepth = function (root) {
  if (!root) return 0
  // 计算左子树的最大深度
  let leftDepth = maxDepth(root.left)
  // 计算右子树的最大深度
  let rightDepth = maxDepth(root.right)
  // 最大深度为左、右子树深度的较大者加1（加上当前节点的深度）
  return Math.max(leftDepth, rightDepth) + 1
}

// 栈 深度优先遍历 DFS
var maxDepth = function (root) {
  if (!root) return 0
  const stack = [[root, 1]]
  let max = 1

  while (stack.length) {
    const [obj, num] = stack.pop()

    // 如果是叶子节点
    if (!obj.left && !obj.right) {
      max = Math.max(max, num)
    }
    if (obj.left) stack.push([obj.left, num + 1])
    if (obj.right) stack.push([obj.right, num + 1])
  }
  return max
}

// 队列 广度优先遍历 BFS
var maxDepth = function (root) {
  if (!root) return 0

  const queue = [[root, 1]]
  let currentDepth = 0

  while (queue.length) {
    const [o, n] = queue.shift()
    if (o) {
      queue.push([o.left, n + 1]) // 左节点 入队
      queue.push([o.right, n + 1]) // 右节点 入队
      currentDepth = n // 当前层级
    }
  }
  return currentDepth
}
