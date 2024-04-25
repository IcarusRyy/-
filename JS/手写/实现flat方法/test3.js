function myFlat(arr) {
  let res = []
  for (let item of arr) {
    if (Array.isArray(item)) {
      res = res.concat(myFlat(item))
    } else {
      res.push(item)
    }
  }
  return res
}

let arr = [[1, 2, 3, 4], [[6, 7, 8, 9]], 10]
console.log(myFlat(arr))
