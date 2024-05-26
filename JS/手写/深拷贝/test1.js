function deepClone(obj, map = new WeakMap()) {
  if (obj === null || typeof obj !== "object") return obj
  if (map.has(obj)) {
    return map.get(obj)
  }
  let result = Array.isArray(obj) ? [] : {}
  map.set(obj, result)

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key], map)
    }
  }
  return result
}
