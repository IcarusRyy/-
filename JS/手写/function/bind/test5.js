Function.prototype.myBind = function (context = window, ...args) {
  const self = this
  return function (...args2) {
    self.apply(context, args.concat(args2))
  }
}
