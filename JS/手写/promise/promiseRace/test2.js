Promise.myRace = function (proms) {
  return new Promise((resolve, reject) => {
    for (let item of proms) {
      Promise.resolve(item).then(resolve, reject)
    }
  })
}
