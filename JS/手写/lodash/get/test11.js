function get(obj, path, defaultValue = undefined) {
  let keys = Array.isArray(path) ? path : path.split(".")
  let res = obj
  for (let key of keys) {
    if (res.hasOwnProperty(key)) {
      res = res[key]
    } else {
      return defaultValue
    }
  }
  return res
}
