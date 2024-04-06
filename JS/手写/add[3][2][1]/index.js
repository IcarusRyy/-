function createProxy(val = 0) {
  return new Proxy(
    {},
    {
      get: function (target, key) {
        if (key === Symbol.toPrimitive) {
          return () => val
        }
        return createProxy(val + Number(key))
      },
    }
  )
}

const add = createProxy()

console.log(add[1][2][3] + 4)

// var a = 2
// let c = 4
// function test() {
//   a = 3
//   let d = 5
//   console.log(d)
//   console.log(c)
//   return a
// }
// console.log(test())
