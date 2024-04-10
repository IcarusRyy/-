Promise.myRace = function (proms) {
  return new Promise((resolve, reject) => {
    for (let item of proms) {
      Promise.resolve(item).then(resolve, reject)
    }
  })
}

Promise.myRace([1, 3, Promise.resolve(4)]).then((data) => console.log(data))
