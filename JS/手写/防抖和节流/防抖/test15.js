function myDebounce(fn, wait) {
  let timer = null
  return function (...args) {
    if (timer) clearTimer(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}
