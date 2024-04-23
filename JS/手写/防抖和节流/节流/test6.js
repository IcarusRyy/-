function throttly(fn, delay) {
  let time = Date.now()
  return function (...args) {
    let nowTime = Date.now()
    if (nowTime - time >= delay) {
      fn.apply(this, args)
      time = now
    }
  }
}
