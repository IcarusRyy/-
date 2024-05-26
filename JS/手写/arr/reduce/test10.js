Array.myReduce = function (fn, init) {
  let res = init,
    start = 0
  if (res === undefined) {
    res = this[0]
    start = 1
  }
  for (let i = start; i < this.length; i++) {
    res += fn(res, this[i], i, this)
  }
  return res
}
