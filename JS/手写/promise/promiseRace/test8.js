Promise.myRace = function (arr) {
  return new Promise((resolve, reject) => {
    for (let item of arr) {
      Promise.resolve(item).then(resolve, reject)
    }
  })
}
