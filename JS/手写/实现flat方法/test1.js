Array.prototype.myFlat = function () {
  let result = []

  for (let item of this) {
    if (Array.isArray(item)) {
      result = result.concat(item.myFlat())
    } else {
      result = result.concat(item)
    }
  }
  return result
}
let arr = [[1, 2, 3, 4], [[6, 7, 8, 9]], 10]

console.log(arr.myFlat())

let test = []

console.log(test.concat(1, 2, 3, 3))
