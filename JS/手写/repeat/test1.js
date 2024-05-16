function repeat(fn, times, wait) {
  return new Promise((resolve) => {
    let executor = function (count) {
      if (count <= 0) {
        return resolve()
      } else {
        fn()
        setTimeout(() => {
          executor(count - 1)
        }, wait)
      }
    }
    executor(times)
  })
}

const test = () => console.log(123)

repeat(test, 5, 1000)
