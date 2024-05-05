function toTree(arr) {
  let result = []
  let map = new Map()
  for (let item of arr) {
    map.set(item.id, item)
  }
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
  { id: 1, pid: 0, name: "1" },
  { id: 2, pid: 1, name: "2" },
  { id: 3, pid: 2, name: "3" },
]

console.log(toTree(arr))
