/**
 * @param {number[]} arr
 * @return {boolean}
 */
var uniqueOccurrences = function (arr) {
  const map = new Map()
  for (const x of arr) {
    map.set(x, (map.get(x) || 0) + 1)
  }
  const res = new Set()
  for (const [key, value] of map) {
    res.add(value)
  }
  return res.size === map.size
}
