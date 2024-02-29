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
 * @return {number}
 */

// 广度优先遍历  队列
var minDepth = function (root) {
  if (!root) return 0
  const bfsQueue = [[root, 1]] // 广度优先搜索的队列，包含节点和深度
  while (bfsQueue.length) {
    const [obj, num] = bfsQueue.shift()
    // 如果当前节点是叶子节点 就是既没有左节点 也没有右节点
    if (!obj.left && !obj.right) {
      return num
    }
    // 如果存在左节点 入队
    if (obj.left) {
      bfsQueue.push([obj.left, num + 1])
    }
    // 如果存在右节点 入队
    if (obj.right) {
      bfsQueue.push([obj.right, num + 1])
    }
  }
}

// 递归
var minDepth = function (root) {
  if (!root) return 0
  if (!root.left) {
    return 1 + minDepth(root.right)
  }
  if (!root.right) {
    return 1 + minDepth(root.left)
  }
  return 1 + Math.min(minDepth(root.left), minDepth(root.right))
}
