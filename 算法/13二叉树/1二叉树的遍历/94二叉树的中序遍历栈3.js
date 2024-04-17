const treeMid = function (root) {
  let stack = []
  let res = []
  let cur = root
  while (cur || stack.length) {
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
