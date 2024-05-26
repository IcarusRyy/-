function get(obj, path, defaultValue = undefined) {
  const keys = Array.isArray(path) ? path : path.split(".")

  let res = obj
  for (let key of keys) {
    if (res.hasOwnProperty(key)) {
      res = res[key]
    } else {
      res = defaultValue
    }
    if (res === null || res === undefined) {
      return defaultValue
    }
  }
  return res
}
