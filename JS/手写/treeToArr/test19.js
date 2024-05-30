function treeToArr(tree) {
  let res = []
  let traverse = function (node) {
    if (!node) return
    res.push({ id: node.id, pid: node.pid })
    if (node.children && node.children.length > 0) {
      node.children.forEach(traverse)
    }
  }
  if (Array.isArray(tree)) {
    tree.forEach(traverse)
  } else {
    traverse(tree)
  }
  return res
}
