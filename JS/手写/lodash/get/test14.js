function get(obj, path, defaultValue) {
  let keys = Array.isArray(path) ? path : path.split(".")

  let result = obj
  for (let key of keys) {
    if (obj.hasOwnProperty(key)) {
      result = result[key]
    } else {
      result = defaultValue
    }
    if (result === null || result === undefined) return defaultValue
  }
  return result
}
