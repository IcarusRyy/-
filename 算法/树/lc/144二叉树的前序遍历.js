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

// 递归方式
// var preorderTraversal = function (root) {
//   let res = []

//   const fun = (node) => {
//     if (node) {
//       // 先根节点
//       res.push(node.val)
//       // 遍历左子树
//       fun(node.left)
//       // 遍历右子树
//       fun(node.right)
//     }
//   }
//   fun(root)

//   return res
// }

// 栈的方式
var preorderTraversal = function (root) {
  if (!root) return []
  let res = []
  // 根节点入栈
  let stack = [root]
  while (stack.length) {
    const item = stack.pop()
    res.push(item.val)
    // 因为是栈结构,所以是先进后出
    // 所以这里要先把右节点压栈
    if (item.right) {
      stack.push(item.right)
    }
    // 然后再将左节点压栈
    if (item.left) {
      stack.push(item.left)
    }
  }
  return res
}
