function treeToArr(arr) {
  let res = []
  let traverse = function (node) {
    if (!node) return
    res.push({ id: node.id, pid: node.pid })
    if (node.children && node.children.length) {
      node.children.forEach(traverse)
    }
  }
  if (Array.isArray(arr)) {
    arr.forEach(traverse)
  } else {
    traverse(arr)
  }
  return res
}
