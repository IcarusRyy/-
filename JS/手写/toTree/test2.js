function toTree(arr) {
  let map = new Map()
  arr.forEach((item) => {
    map.set(item.id, item)
  })

  let result = []
  for (let i = 0; i < arr.length; i++) {
    let parent = map.get(item.pid)

    if (parent) {
      parent.children = parent.children || []
      parent.children.push(item)
    } else {
      result.push(item)
    }
  }
  return result
}
