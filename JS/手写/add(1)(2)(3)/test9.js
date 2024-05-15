function add(...args) {
  let total = args.reduce((acc, cur) => acc + cur)
  function sum(...args2) {
    total += args2.reduce((acc, cur) => acc + cur)
    return sum
  }
  sum.valueOf = function () {
    return total
  }
  return sum
}

console.log(add(1)(2).valueOf())
