function createProxy(val = 0) {
  return new Proxy(
    {},
    {
      get: function (target, key) {
        console.log(key)
        if (key === Symbol.toPrimitive) {
          return () => val
        }
        return createProxy(val + Number(key))
      },
    }
  )
}

const add = createProxy()

console.log(add[1][2] + 1)
