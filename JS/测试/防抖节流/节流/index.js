function throttle(fn, delay) {
  let time = Date.now()
  return function (...args) {
    if (Date.now() - time >= delay) {
      time = Date.now()
      return fn.apply(this, args)
    }
  }
}
