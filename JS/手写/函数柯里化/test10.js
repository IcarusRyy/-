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

const add = (a, b, c) => a + b + c

const sum = curry(add)
console.log(sum(1)(2)(3))
