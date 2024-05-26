function getIntersection(...args) {
  let arr = args.map((item) => item.sort((a, b) => a - b))

  let [start, end] = arr[0]
  for (let item of arr) {
    let [curStart, curEnd] = item
    start = Math.max(curStart, start)
    end = Math.min(curEnd, end)
    if (start > end) return null
  }
  return [start, end]
}

function underlineToHump(obj) {
  let res = {}
  let keys = Object.keys(obj)
  for (let key of keys) {
    const newKey = key.replace()
    if (typeof obj[key] === "object") {
      res[newKey] = underlineToHump(obj[key])
    } else {
      res[newKey] = obj[key]
    }
  }
  return res
}
