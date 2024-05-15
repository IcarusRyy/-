Function.prototype.myBind = function (context, bindArgs) {
  const self = this
  return function (applyArgs) {
    return self.apply(context, bindArgs.concat(applyArgs))
  }
}
