Function.prototype.myBind = function (context, ...bindArgs) {
  const self = this
  return function (...applyArgs) {
    return self.call(context, bindArgs.concat(applyArgs))
  }
}
