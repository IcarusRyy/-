Function.prototype.myApply = function (context, args) {
  const key = Symbol("key")
  context = this
  const result = context[key](...args)
  delete context[key]
  return result
}
