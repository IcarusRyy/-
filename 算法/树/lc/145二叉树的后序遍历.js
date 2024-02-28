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
//  递归
var postorderTraversal = function (root) {
  const res = []

  const fun = (root) => {
    if (!root) return
    fun(root.left)
    fun(root.right)
    res.push(root.val)
  }
  fun(root)
  return res
}

// 栈  使用 根 右 左 将遍历的结果以相反的顺序添加到结果数组中（通过在数组前端插入节点值），最终得到了“左 -> 右 -> 根”的后序遍历顺序
var postorderTraversal = function (root) {
  if (!root) return []
  const arr = []
  const stack = [root]
  while (stack.length) {
    const item = stack.pop()
    // 从前面推入数组
    arr.unshift(item.val)
    // 先将左边 压栈 会后执行
    if (item.left) {
      stack.push(item.left)
    }
    // 再将右边压栈 会先执行
    if (item.right) {
      stack.push(item.right)
    }
  }
  return arr
}
