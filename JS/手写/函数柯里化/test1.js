function curry(fn) {
  return function curried(...args) {
    console.log(args, "args")
    console.log(fn.length, "fnlength")
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}

function add(a, b, c, d) {
  return a + b + c
}
console.log(add.length, "length")
const curriedAdd = curry(add)

console.log(curriedAdd(1)(2)(3))
