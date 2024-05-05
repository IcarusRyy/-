function treeToArr(tree) {
  let result = []
  let traverse = function (node) {
    if (!node) return
    result.push({ id: node.id, pid: node.pid })
    if (node.children) {
      node.children.forEach(traverse)
    }
  }
  if (Array.isArray(tree)) {
    arr.forEach(traverse)
  } else {
    traverse(tree)
  }
  return result
}
let arr = [
  {
    id: 1,
    children: [
      { id: 2, pid: 1 },
      { id: 3, pid: 1 },
    ],
  },
  { id: 4, children: [{ id: 5, pid: 2 }] },
]

console.log(treeToArr(arr))
