function createProxy(val = 0) {
  return new Proxy(
    {},
    {
      get(target, key) {
        if (key === Symbol.toPrimitive) {
          return () => val
        }
        return createProxy(val + Number(key))
      },
    }
  )
}

const add = createProxy()
console.log(add[1][2][3] + 2)
