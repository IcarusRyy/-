/**
 * function TreeNode(val, left , right){
 *  this.val = val === undefined ? 0 : val;
 *  this.left = left === undefined ? 0 : left;
 *  this.right = right === undefined ? 0 : right;
 * }
 */

var preorderTraversal = function (root) {
  let res = []

  const dfs = function (node) {
    if (!node) return
    res.push(node.val)
    dfs(node.left)
    dfs(node.right)
  }
  dfs(root)
  return res
}
