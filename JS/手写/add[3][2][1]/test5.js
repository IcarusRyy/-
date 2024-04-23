function createProxy(val = 0) {
  return new Proxy(
    {},
    {
      get: function (target, key) {
        if (key === Symbol.toPrimitive) {
          return () => val
        }
        return createProxy(Number(key) + val)
      },
    }
  )
}
const add = createProxy()

console.log(add[1])
