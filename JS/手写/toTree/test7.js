function toTree(arr) {
  let map = new Map()
  for (let item of arr) {
    map.set(item.id, item)
  }

  let result = []

  for (let item of arr) {
    const parent = map.get(item.pid)
    if (parent) {
      parent.children = parent.children || []
      parent.children.push(item)
    } else {
      result.push(item)
    }
  }
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
