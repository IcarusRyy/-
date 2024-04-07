/**
 * function TreeNode(val, left, right){
 *  this.val = val === undefined ? 0 : val;
 *  this.left = left === undefined ? null : left;
 *  this.right = right === undefined ? null : right;
 * }
 */

var inorderTraversal = function (root) {
  let res = []

  const dfs = function (node) {
    if (!node) return
    dfs(node.left)
    res.push(node.val)
    dfs(node.right)
  }
  dfs(root)
  return res
}
