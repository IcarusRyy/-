function sum(...args) {
  let total = args.reduce((acc, cur) => acc + cur, 0)

  function sumFun(...newArgs) {
    total += newArgs.reduce((acc, cur) => acc + cur, 0)

    return sumFun
  }

  sumFun.valueOf = function () {
    return total
  }
  return sumFun
}

// console.log(sum(2, 3)(2))
console.log(sum(2, 3)(2).valueOf())
console.log(sum(2)(4, 1)(2).valueOf())

console.log(sum(1, 2, 3) + sum(4, 5))
