Function.prototype.myBind = function (context, ...args) {
  const self = this
  return function (...args2) {
    self.apply(context, args.concat(args2))
  }
}

Function.prototype.myApply = function (context, args = []) {
  const key = Symbol("key")
  context[key] = this
  const result = context[key](...args)
  delete context[key]
  return result
}
