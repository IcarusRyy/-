function sum(...args) {
  let total = args.reduce((a, b) => a + b)
  function sumFn(...args2) {
    total += args2.reduce((a, b) => a + b)
    return sumFn
  }
  sumFn.valueOf = function () {
    return total
  }
  return sumFn
}
console.log(sum(2, 3)(2).valueOf())
console.log(sum(2)(4, 1)(2).valueOf())

console.log(sum(1, 2, 3) + sum(4, 5))
