var levelOrderBottom = function (root) {
  if (!root) return []
  let queue = [root],
    res = []

  while (queue.length) {
    let len = queue.length
    let temp = []
    while (len) {
      len--

      let node = queue.shift()
      temp.push(node.val)
      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
    }
    res.unshift(temp)
  }
  return res
}
