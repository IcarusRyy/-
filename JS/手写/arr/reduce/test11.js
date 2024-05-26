Array.prototype.myReduce = function (fn, init) {
  let start = 0
  let result = init
  if (typeof result == "undefined") {
    result = this[0]
    start = 1
  }
  for (let i = start; i < this.length; i++) {
    result = fn(result, this[i], i, this)
  }
  return result
}
console.log([1, 2, 3, 4].myReduce((a, b) => a + b))
