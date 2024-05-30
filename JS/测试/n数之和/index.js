function nSum(data, target, n) {
  let res = []
  let dfs = function (start, path, curSum, count) {
    if (curSum === 0 && count === n) {
      res.push([...path])
      return
    }
    for (let i = start; i < data.length; i++) {
      dfs(i + 1, [...path, data[i]], curSum - data[i], count + 1)
    }
  }
  dfs(0, [], target, 0)
  return res
}
console.log(nSum([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10, 3))
