Function.prototype.myBind = function (context, ...args) {
  const self = this
  return function (...args2) {
    self.apply(context, args.concat(args2))
  }
}
