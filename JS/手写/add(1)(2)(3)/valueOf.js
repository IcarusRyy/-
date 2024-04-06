function add(...args) {
  let total = args.reduce((acc, cur) => acc + cur, 0)

  function sumFunc(...newArgs) {
    total += newArgs.reduce((acc, cur) => acc + cur, 0)
    return sumFunc
  }
  sumFunc.valueOf = function () {
    return total
  }
  return sumFunc
}

console.log(add(1, 2, 3, 4, 5)(5).valueOf())
