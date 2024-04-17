/**
 * function TreeNode(val, left , right){
 *  this.val = val === undefined ? 0 : val;
 *  this.left = left === undefined ? 0 : left;
 *  this.right = right === undefined ? 0 : right;
 * }
 */

var preorderTraversal = function (root) {
  let stack = [root]
  let res = []

  while (stack.length) {
    const node = stack.pop()
    res.push(node.val)
    node.right && stack.push(node.right)
    node.left && stack.push(node.left)
  }
  return res
}
