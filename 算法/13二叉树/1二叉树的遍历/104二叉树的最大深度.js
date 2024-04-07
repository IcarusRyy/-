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

// 利用二叉树的最大高度 等于最大深度来求解
var maxDepth = function (root) {
  if (!root) return 0

  const getHeight = function (node) {
    if (!node) return 0
    let leftHeight = getHeight(node.left)
    let rightHeight = getHeight(node.right)

    return 1 + Math.max(leftHeight, rightHeight)
  }
  return getHeight(root)
}

// var maxDepth = function (root) {}
