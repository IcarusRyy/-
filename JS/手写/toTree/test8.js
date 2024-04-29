function toTree(arr) {
  const map = new Map()
  arr.forEach((item) => {
    map.set(item.id, item)
  })

  let result = []
  arr.forEach((item) => {
    let parent = map.get(item.pid)
    if (parent) {
      parent.children = parent.children || []
      parent.children.push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

let arr = [
  {
    id: 1,
    pid: 0,
    name: "body",
  },
  {
    id: 2,
    pid: 1,
    name: "title",
  },
  {
    id: 3,
    pid: 2,
    name: "div",
  },
]
console.log(toTree(arr))
