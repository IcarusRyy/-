function add(...args) {
  let total = args.reduce((acc, cur) => acc + cur, 0)

  function sum(...newArgs) {
    total += newArgs.reduce((acc, cur) => acc + cur)
    return sum
  }
  sum.valueOf = function () {
    return total
  }
  return sum
}

console.log(add(1)(2) + 3)
