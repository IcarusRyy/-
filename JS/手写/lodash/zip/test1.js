function zip(...args) {
  let arr = Array.from(args)
  console.log(arr)
  let len = args[0].length
  let res = new Array(len).fill().map(() => new Array(arr.length))

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < arr.length; j++) {
      res[i][j] = arr[j][i]
    }
  }
  return res
}
console.log(zip(["a", "b"], [1, 2], [true, false]))
// setTimeout(() => console.log(0))
// new Promise((resolve) => {
//   console.log(1)
//   resolve(2)
//   console.log(3)
// }).then((o) => console.log(o))

// new Promise((resolve) => {
//   console.log(4)
//   resolve(5)
// })
//   .then((o) => console.log(o))
//   .then(() => console.log(6))
