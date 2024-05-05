function myGet(obj, path, defaultValue = undefined) {
  let keys = Array.isArray(path) ? path : path.split(".")
  let result = obj
  for (let key of keys) {
    result = result.hasOwnProperty(key) ? result[key] : undefined
    if (result === undefined || result === null) return defaultValue
  }
  return result
}

let abc = { a: { b: { c: 1 } } }

console.log(myGet(abc, "a.b.c"))
