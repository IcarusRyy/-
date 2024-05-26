function throttle(fn, delay) {
  let time = Date.now()
  return function (...args) {
    if (Date.now() - time >= delay) {
      fn.apply(this, args)
      time = Date.now()
    }
  }
}
