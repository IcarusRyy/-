function throttly(fn, delay) {
  let time = Date.now()
  return function (...args) {
    let now = Date.now()
    if (now - time >= delay) {
      time = now
      fn.apply(this, args)
    }
  }
}
