Promise.myRace = function (arr) {
  return new Promise((resolve, reject) => {
    arr.Foreach((item) => {
      Promise.resolve(item).then(resolve, reject)
    })
  })
}
