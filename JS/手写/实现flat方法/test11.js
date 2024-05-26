Array.prototype.myFlat = function () {
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
let arr = [[1, 2, 3, 4], [[6, 7, 8, 9]], 10]
console.log(arr.myFlat())
