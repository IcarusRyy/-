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
//  中序遍历  左 根 右

// 递归
var inorderTraversal = function (root) {
  const res = []

  const fun = (root) => {
    if (!root) return
    fun(root.left)
    res.push(root.val)
    fun(root.right)
  }

  return res
}

// 栈
var inorderTraversal = function (root) {
  const res = []

  const stack = []
  let o = root

  while (stack.length || o) {
    while (o) {
      stack.push(o)
      o = o.left
    }

    const item = stack.pop()
    res.push(item.val)
    o = item.right
  }

  return res
}
