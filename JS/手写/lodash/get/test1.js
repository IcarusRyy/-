function get(obj, path, defaultValue = undefined) {
  const keys = Array.isArray(path) ? path : path.split(".")

  let result = obj

  for (let key of keys) {
    result = result[key] ? result[key] : defaultValue
    if (!result) return defaultValue
  }

  return result
}

const object = { a: { b: { c: 1 } } }
console.log(get(object, "a.b.c")) // 输出 1
console.log(get(object, ["a", "b", "c"])) // 输出 1 - 使用数组路径
console.log(get(object, "a.b.c.d", "default1")) // 输出 'default'
