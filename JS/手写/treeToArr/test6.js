function treeToArr(tree) {
  let res = []

  let traverse = function (node) {
    if (!node) return
    res.push({ id: node.id, pid: node.pid })

    if (node.children && node.children.length) {
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
