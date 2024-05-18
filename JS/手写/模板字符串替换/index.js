function parseString(str, obj) {
  // 这里为什么使用Object.keys 而不是使用for in， 因为for in会遍历原型链上的属性
  Object.keys(obj).forEach((key) => {
    str = str.replace(new RegExp(`{{${key}}}`, "g"), obj[key])
  })
  return str
}
