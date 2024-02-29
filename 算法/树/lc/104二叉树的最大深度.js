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
