var inorderTraversal = function (root) {
  let stack = []
  let cur = root
  let res = []
  while (cur || stack.length) {
    // 先将所有的左节点推入栈中
    while (cur.left) {
      stack.push(cur.left)
      cur = cur.left
    }
    const node = stack.pop()
    res.push(node.val)
    cur = node.right
  }
  return res
}
