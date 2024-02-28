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
//  递归
var postorderTraversal = function (root) {
  const res = []

  const fun = (root) => {
    if (!root) return
    fun(root.left)
    fun(root.right)
    res.push(root.val)
  }
  fun(root)
  return res
}
