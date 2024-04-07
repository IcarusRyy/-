/**
 * function TreeNode(val, left, right){
 *  this.val = val === undefined ? 0 : val;
 *  this.left = left === undefined ? null : left;
 *  this.right = right === undefined ? null: right;
 * }
 */

var postorderTraversal = function (root) {
  let res = []

  const dfs = (root) => {
    if (!root) return
    dfs(root.left)
    dfs(root.right)
    res.push(root.val)
  }
  dfs(root)
  return res
}
