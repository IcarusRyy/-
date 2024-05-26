function add(...args) {
  let total = args.reduce((a, b) => a + b)
  let sum = function (...args2) {
    total += args2.reduce((a, b) => a + b)
    return sum
  }
  sum.valueOf = function () {
    return total
  }
  return sum
}
console.log(add(1)(2)(3) + 2)
