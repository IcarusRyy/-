Promise.myRace = function (arr) {
  return new Promise((resolve, reject) => {
    for (let item of arr) {
      Promise.resolve(item).then(resolve, reject)
    }
  })
}

Promise.myRace([1, 2, 3, Promise.reject(444)]).then(
  (data) => console.log(data),
  (rea) => console.log(rea)
)
