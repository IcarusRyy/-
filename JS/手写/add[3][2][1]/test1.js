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

let add = createProxy()

console.log(add[1] + 1)
