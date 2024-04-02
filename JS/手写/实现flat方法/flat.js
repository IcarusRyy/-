let arr = [[1, 2, 3, 4], [[6, 7, 8, 9]], 10]

Array.prototype.customFlat = function () {
  let result = []

  for (const item of this) {
    if (Array.isArray(item)) {
      result = result.concat(item.customFlat())
    } else {
      result.push(item)
    }
  }
  return result
}
console.log(arr.customFlat())
