/**
 * function TreeNode(val, left, right){
 * this.val = val === undefined ? 0 : val;
 * this.left = left === undefined ? null : left;
 * this.right = right === undefined ? null : right;
 * }
 */

var levelOrder = function (root) {
  if (!root) return []

  let queue = [root],
    res = []

  while (queue.length) {
    let len = queue.length
    let temp = []
    while (len) {
      let node = queue.shift()
      temp.push(node.val)
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
      len--
    }
    res.push(temp)
  }
  return res
}
