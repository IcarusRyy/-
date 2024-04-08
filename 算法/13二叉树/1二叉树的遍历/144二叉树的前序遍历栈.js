/**
 * function TreeNode(val, left , right){
 *  this.val = val === undefined ? 0 : val;
 *  this.left = left === undefined ? 0 : left;
 *  this.right = right === undefined ? 0 : right;
 * }
 */

var preorderTraversal = function (root) {
  if (!root) return []

  const stack = [root]
  const result = []

  while (stack.length > 0) {
    const node = stack.pop() // 获取栈顶元素
    result.push(node.val) // 访问当前节点

    if (node.right) {
      stack.push(node.right) // 右子节点先入栈
    }

    if (node.left) {
      stack.push(node.left) // 左子节点后入栈
    }
  }
  return result
}
