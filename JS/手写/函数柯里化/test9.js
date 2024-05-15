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

const p = new Promise((resolve, reject) => {
  reject(1)
})
p.catch((err) => {
  console.log(err, "catch")
  return err
}).then(
  (data) => console.log(data, "then"),
  (err) => console.log(err, "err")
)
