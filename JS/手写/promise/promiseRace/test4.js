Promise.Myrace = function (arr) {
  return new Promise((resolve, reject) => {
    arr.forEach((item) => {
      Promise.resolve(item).then(resolve, reject)
    })
  })
}
