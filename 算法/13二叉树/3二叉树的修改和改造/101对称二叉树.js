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
 * @return {boolean}
 */
var isSymmetric = function (root) {
  if (!root) return true

  let dfs = function (left, right) {
    if (!left && !right) {
      return true
    } else if ((!left && right) || (left && !right)) {
      return false
    } else if (left.val !== right.val) {
      return false
    }

    let outSide = dfs(left.left, right.right)
    let inSide = dfs(left.right, right.left)
    return outSide && inSide
  }

  return dfs(root.left, root.right)
}
