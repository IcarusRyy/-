function myThrottle(fn, delay) {
  let time = Date.now()

  return function (...args) {
    let nowTime = Date.now()
    if (nowTime - time >= delay) {
      return fn.apple(this, args)
    }
  }
}
