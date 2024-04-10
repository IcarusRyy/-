function add(...args) {
  let total = args.reduce((arr, cur) => arr + cur, 0)

  function sum(...newArr) {
    total += newArr.reduce((arr, cur) => arr + cur, 0)
    return sum
  }
  sum.valueOf = function () {
    return total
  }
  return sum
}

console.log(add(1, 2)(3) + add(1, 2)(3))
