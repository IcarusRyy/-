Array.myFlat = function () {
  let res = []
  for (let item of this) {
    if (Array.isArray(item)) {
      res = res.concat(item.myFlat())
    } else {
      res.push(item)
    }
  }
  return res
}
