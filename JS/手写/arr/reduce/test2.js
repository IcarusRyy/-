Array.prototype.myReduce = function (fn, initValue) {
  let res = initValue
  let start = 0
  if (typeof res === "undefined") {
    res = this[0]
    start = 1
  }
  for (let i = start; i < this.length; i++) {
    res = fn(res, this[i], i, this)
  }
  return res
}
console.log([1, 2, 3].myReduce((a, b) => a + b))
