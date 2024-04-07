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
// var maxDepth = function (root) {
//   if (!root) return 0

//   // 后序遍历
//   const getHeight = function (node) {
//     if (!node) return 0
//     let leftHeight = getHeight(node.left)
//     let rightHeight = getHeight(node.right)

//     return 1 + Math.max(leftHeight, rightHeight)
//   }
//   return getHeight(root)
// }

// 利用前序遍历来求解二叉树的最大深度
var maxDepth = function (root) {
  // 记录当前的最深层级
  let res = 0
  let getDeep = function (node, cur = 0) {
    if (!node) {
      res = Math.max(res, cur)
      return
    }
    getDeep(node.left)
    getDeep(node.right)
  }
  getDeep(root)
  return res
}
