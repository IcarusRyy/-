/**
 * function TreeNode(val, left, right){
 *  this.val = val === undefined ? 0 : val;
 *  this.left = left === undefined ? null : left;
 *  this.right = right === undefined ? null : right;
 * }
 */

var inorderTraversal = function (root) {
  let stack = []
  let current = root
  let result = []

  while (current || stack.length) {
    while (current) {
      stack.push(current)
      current = current.left
    }

    current = stack.pop()
    result.push(node.val)
    current = current.right
  }
  return result
}
