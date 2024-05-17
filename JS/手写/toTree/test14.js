function toTree(arr) {
  let map = new Map()
  for (let item of arr) {
    map.set(item.id, item)
  }

  let res = []
  arr.forEach((item) => {
    let parent = map.get(item.pid)
    if (parent) {
      parent.children = parent.children || []
      parent.children.push(item)
    } else {
      res.push(item)
    }
  })
  return res
}
const arr = [
  { id: 1, pid: 0 },
  { id: 2, pid: 1 },
  { id: 3, pid: 1 },
  { id: 4, pid: 2 },
]

console.log(JSON.stringify(toTree(arr)))
