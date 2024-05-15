Function.prototype.myCall = function (context, ...args) {
  const key = Symbol("key")
  context = this
  const res = context[key](...args)
  delete context[key]
  return res
}
