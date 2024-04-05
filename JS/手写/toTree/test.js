const toTree = (arr) => {
  let map = new Map()

  // 将每一个元素 存放在map里
  arr.forEach((item) => {
    map.set(item.id, item)
  })

  let result = []

  for (let item of arr) {
    let parent = map.get(item.pid)

    if (!parent) {
      result.push(item)
    } else {
      parent.children = parent.children || []
      parent.children.push(item)
    }
  }

  return result
}
