Function.prototype.myApply = function (context, args) {
  const key = Symbol("key")
  context[key] = this
  const result = context[key](...args)
  delete context[key]
  return result
}
