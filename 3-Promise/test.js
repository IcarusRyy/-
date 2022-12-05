const promiseObj2 = new Promise((resolve, reject) => {
  resolve("哈哈")
})
promiseObj2.then(
  (result) => console.log(result),
  (reason) => console.log(reason)
)
console.log("1")
