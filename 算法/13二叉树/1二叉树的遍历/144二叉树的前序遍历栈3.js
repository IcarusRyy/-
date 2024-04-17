const treeBefore = function (root) {
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
