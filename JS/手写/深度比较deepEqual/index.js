function deepEquil(a, b) {
  if (a === b) return true

  if (a === null || b === null) return a === b

  if (typeof a !== typeof b) return false

  if (typeof a === "object") {
    const akeys = Object.keys(a)
    const bkeys = Object.keys(b)
    // 如果键的数量不相同，则对象不等
    if (akeys.length !== bkeys.length) return false
    // 递归比较每个键
    for (let key of akeys) {
      if (!bkeys.includes(key)) return false
      if (!deepEquil(a[key], b[key])) return false
    }
  }

  return a === b
}

// console.log(typeof null)
