/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */

// 递归
var invertTree = function (root) {
  if (!root) return null

  let tmp = root.left
  root.left = root.right
  root.right = tmp

  invertTree(root.right)
  invertTree(root.left)
}

// 栈  深度优先遍历 DFS
var invertTree = function (root) {
  if (!root) return null

  const stack = [root]

  while (stack.length) {
    const item = stack.pop()
    const tmp = item.left
    item.left = item.right
    item.right = tmp
    item.left && stack.push(item.left)
    item.right && stack.push(item.right)
  }
  return root
}

// 队列 广度优先遍历 BFS

var invertTree = function (root) {
  if (!root) return null

  const queue = [root]
  while (queue.length) {
    // 队列 从头取
    const item = queue.shift()
    const tmp = item.left
    item.left = item.right
    item.right = tmp
    item.left && queue.push(item.left)
    item.right && queue.push(item.right)
  }
  return root
}
