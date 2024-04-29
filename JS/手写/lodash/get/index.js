function get(object, path, defaultValue) {
  // 将字符串路径转换为数组，以便能够处理数组索引和复合键
  const keys = Array.isArray(path)
    ? path
    : path.replace(/\[(\d+)]/g, ".$1").split(".")

  let result = object

  // 遍历路径数组，逐步深入对象
  for (let key of keys) {
    // 如果遇到undefined，则提前返回默认值
    result = result[key] !== undefined ? result[key] : null
    if (result === null) {
      return defaultValue
    }
  }

  return result
}

// 使用示例
const object = { a: { b: { c: 1 } } }
console.log(get(object, "a.b.c")) // 输出 1
console.log(get(object, ["a", "b", "c"])) // 输出 1 - 使用数组路径
console.log(get(object, "a.b.c.d", "default")) // 输出 'default'
