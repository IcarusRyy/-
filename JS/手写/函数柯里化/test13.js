function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}

const add = (a, b, c, d) => a + b + c + d
const curriedAdd = curry(add)
console.log(curriedAdd(1)(2)(3)(4))
