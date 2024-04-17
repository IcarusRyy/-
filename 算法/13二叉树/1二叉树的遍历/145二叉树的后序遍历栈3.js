const treeBack = function (root) {
  let stack = [root]
  let res = []
  while (stack.length) {
    const node = stack.pop()
    node.left && stack.push(node.left)
    node.right && stack.push(node.right)
    res.unshift(node.val)
  }
  return res
}
