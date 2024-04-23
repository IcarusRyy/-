function toTree(arr) {
  let map = new Map()
  for (let item of arr) {
    map.set(item.id, item)
  }
  let res = []
  for (let item of arr) {
    let parent = map.get(item.pid)
    if (parent) {
      parent.children = parent.children || []
      parent.children.push(item)
    } else {
      res.push(item)
    }
  }
  return res
}
