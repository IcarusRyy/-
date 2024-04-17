var levelOrder = function (root) {
  let queue = [root]
  let res = []
  while (queue.length) {
    let len = queue.length
    let temp = []
    while (len) {
      const node = queue.shift()
      temp.push(node.val)
      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
      len--
    }
    res.push(temp)
  }
  return res
}
