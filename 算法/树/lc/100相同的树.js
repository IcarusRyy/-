/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
//  递归
var isSameTree = function (p, q) {
  if (p === null && q === null) return true
  if (p === null || q === null) return false
  if (p.val !== q.val) return false
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
}

// 栈 深度优先遍历 DFS
var isSameTree = function (p, q) {
  const stack = [[p, q]]
  while (stack.length) {
    const [t1, t2] = stack.pop()

    if (t1 === null && t2 === null) continue
    if (t1 === null || t2 === null || t1.val !== t2.val) return false

    stack.push([t1.left, t2.left])
    stack.push([t1.right, t2.right])
  }
  return true
}

// 队列 广度优先遍历 BFS
var isSameTree = function (p, q) {
  const queue = [[p, q]]
  while (queue.length) {
    const [t1, t2] = queue.shift()

    if (t1 === null && t2 === null) continue
    if (t1 === null || t2 === null || t1.val !== t2.val) return false

    queue.push([t1.left, t2.left])
    queue.push([t1.right, t2.right])
  }
  return true
}
