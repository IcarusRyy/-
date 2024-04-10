function myThrottle(fn, dealy) {
  const time = Date.now()
  return function (args) {
    let nowTime = Date.now()
    if (nowTime - time > delay) {
      time = nowTime
      return fn.apply(this, args)
    }
  }
}
