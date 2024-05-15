Function.prototype.myBind = function (context = window, ...bindArgs) {
  const self = this // 保存原函数
  return function (...applyArgs) {
    return self.apply(context, bindArgs.concat(applyArgs))
  }
}

Function.prototype.myBind = function (context, ...bindArgs) {
  let self = this
  return function (...applyArgs) {
    return self.apply(context, bindArgs.concat(applyArgs))
  }
}

Function.prototype.MyApply = function (context = window, args = []) {
  const key = Symbol("key")
  context[key] = this
  const res = context[key](...args)
  delete context[key]
  return res
}
