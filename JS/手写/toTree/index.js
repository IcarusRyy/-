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

// function toTree(arr) {
//   let map = new Map()
//   for (let item of arr) {
//     map.set(item.id, item)
//   }
//   let result = []

//   for (let i = 0; i < arr.length; i++) {
//     let item = arr[i]
//     let parentId = item.pid
//     if (!parentId) {
//       result.push(item)
//     } else {
//       let parent = map.get(parentId)
//       if (parent) {
//         parent.children = parent.children || []
//         parent.children.push(item)
//       }
//     }
//   }
//   console.log(map)
//   return result
// }

function toTree(arr) {
  let map = new Map()
  for (let item of arr) {
    map.set(item.id, item)
  }
  let result = []

  for (let item of arr) {
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

console.log(toTree(arr))
