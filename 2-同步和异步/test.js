function sum(a, b, cb) {
  setTimeout(() => {
    cb(a + b)
  }, 5000)
}
console.log("1")
const res = sum(1, 2, (res) => console.log(res, "res"))
console.log(res)
console.log("2")
