function add(...args) {
  let total = args.reduce((a, b) => a + b)
  function sum(...newArgs) {
    total += newArgs.reduce((a, b) => a + b)
    return sum
  }
  sum.valueOf = () => total
  return sum
}

console.log(add(1, 2, 3)(1).valueOf())
