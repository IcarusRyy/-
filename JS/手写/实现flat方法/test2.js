Array.prototype.myFlat = function () {
  let result = []
  for (let item of this) {
    if (Array.isArray(item)) {
      // result = result.concat(item.myFlat())
      result.push(item.myFlat())
    } else {
      result.push(item)
    }
  }
  return item
}
