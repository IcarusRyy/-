function myThrottle(fn, dealy) {
  let time = Date.now()
  return function (...args) {
    let nowTime = Date.now()
    if (nowTime - time > dealy) {
      time = nowTime
      return fn.apply(this, args)
    }
  }
}
