// function toTree(arr) {
//   let map = new Map()
//   for (let item of arr) {
//     map.set(item.id, item)
//   }
//   let res = []
//   for (let item of arr) {
//     let parent = map.get(item.pid)
//     if (parent) {
//       parent.children = parent.children || []
//       parent.children.push(item)
//     } else {
//       res.push(item)
//     }
//   }
//   return res
// }
// const arr = [
//   { id: 1, pid: 0 },
//   { id: 2, pid: 1 },
//   { id: 3, pid: 1 },
//   { id: 4, pid: 2 },
// ]

// console.log(JSON.stringify(toTree(arr)))

let obj = {
  fn: function () {
    console.log(this, "1")
    return () => {
      console.log(this, "2")
      ;(function test() {
        console.log(this === window, "3")
      })()
      setTimeout(() => console.log(this, "4"), 0)
    }
  },
}
obj.fn()()
