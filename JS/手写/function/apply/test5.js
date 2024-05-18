Function.prototype.myApply = function (context = window, args = []) {
  const key = Symbol("key")
  context[key] = this
  const res = context[key](...args)
  delete context[key]
  return res
}
