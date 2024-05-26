function deepEqual(a, b, visited = new WeakMap()) {
  if (a === b) return true
  if (a === null || b === null || typeof a !== typeof b) return false

  if (typeof a === "object") {
    if (visited.has(a)) {
      return visited.get(a) === b
    }
    visited.set(a, b)

    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false
      for (let i = 0; i < a.length; i++) {
        if (!deepEqual(a[i], b[i], visited)) return false
      }
      return true
    }

    const aKeys = Object.keys(a)
    const bKeys = Object.keys(b)
    if (aKeys.length !== bKeys.length) return false

    for (let key of aKeys) {
      if (!(key in b)) return false
      if (!deepEqual(a[key], b[key], visited)) return false
    }
    return true
  }

  return false // 当 a 和 b 不是对象时，直接返回 false（因为前面的相等性检查已经覆盖了基本类型比较）
}
