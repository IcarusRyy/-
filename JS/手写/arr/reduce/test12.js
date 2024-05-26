Array.prototype.myReduce = function (fn, init) {
  let result = init,
    start = 0

  if (typeof result === "undefined") {
    result = this[0]
    start = 1
  }

  for (let i = start; i < this.length; i++) {
    result = fn(result, this[i], i, this)
  }
  return result
}

console.log([1, 2, 3].myReduce((a, b) => a + b))
