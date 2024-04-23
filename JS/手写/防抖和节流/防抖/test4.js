const debounce = (fn, wait) => {
  let time = null
  return function (...args) {
    if (time) {
      clearTimeout(time)
    }
    time = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}
