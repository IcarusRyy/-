function sum(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b)
    }, 1000)
  })
}
sum(1, 2).then((result) => console.log(result)) // 3
sum(1, 2)
  .then((result) => result + 1)
  .then((result) => result + 1)
  .then((result) => console.log(result)) // 5
