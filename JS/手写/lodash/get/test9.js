function get(obj, path, defaultValue = undefined) {
  let keys = Array.isArray(path) ? path : path.split(".")

  let res = obj

  for (let key of keys) {
    res = res[key] === undefined ? defaultValue : res[key]
    if (res === undefined || res === null) return defaultValue
  }

  return res
}
const object = { a: { b: { c: 1 } } }
console.log(get(object, "a.b.c")) // 输出 1
console.log(get(object, ["a", "b", "c"])) // 输出 1 - 使用数组路径
console.log(get(object, "a.b.c.d", "default1")) // 输出 'default'
