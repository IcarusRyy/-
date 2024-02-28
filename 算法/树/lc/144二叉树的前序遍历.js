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
 * @return {number[]}
 */
var preorderTraversal = function (root) {
  let res = []

  const fun = (node) => {
    if (node) {
      // 先根节点
      res.push(node.val)
      // 遍历左子树
      fun(node.left)
      // 遍历右子树
      fun(node.right)
    }
  }
  fun(root)

  return res
}
