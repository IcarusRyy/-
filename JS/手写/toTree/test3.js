function toTree(arr) {
  let map = new Map()

  arr.forEach((element) => {
    map.set(element.id, element)
  })

  let result = []

  for (let i = 0; i < arr.length; i++) {
    let parent = map.get(arr[i].pid)
    if (parent) {
      parent.children = parent.children || []

      parent.children.push(arr[i])
    } else {
      result.push(arr[i])
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
