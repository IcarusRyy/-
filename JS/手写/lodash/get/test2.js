function get(obj, path, defaultValue = undefined) {
  let keys = Array.isArray(path) ? path : path.split(".")

  let result = obj

  for (let key of keys) {
    result = result.hasOwnProperty(key) ? result[key] : defaultValue
    if (result === null || result === undefined) return defaultValue
  }
  return result
}

let abc = { a: { b: { c: 1 } } }

console.log(get(abc, "a.b.c"))
