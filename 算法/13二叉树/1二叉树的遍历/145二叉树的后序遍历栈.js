/**
 * function TreeNode(val, left, right){
 *  this.val = val === undefined ? 0 : val;
 *  this.left = left === undefined ? null : left;
 *  this.right = right === undefined ? null: right;
 * }
 */

var postorderTraversal = function (root) {
  if (!root) return []

  let stack = [root]
  let res = []

  while (stack.length) {
    const node = stack.pop()
    res.push(node.val)

    node.left && stack.push(node.left)
    node.right && stack.push(node.right)
  }
  return res.reverse()
}
