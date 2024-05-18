function repeat(fn, times, wait) {
  return new Promise((resolve) => {
    let executor = function (count) {
      if (count === 0) {
        return resolve()
      } else {
        setTimeout(() => {
          fn()
          executor(count - 1)
        }, wait)
      }
    }
    executor(times)
  })
}
repeat(() => console.log("hello"), 5, 1000)
