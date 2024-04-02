var groupAnagrams = function (strs) {
  let map = new Map()

  for (let str of strs) {
    let newStr = str.split("").sort().join("")
    if (map.has(newStr)) {
      map.get(newStr).push(str)
    } else {
      map.set(newStr, [str])
    }
  }
  return Array.from(map.values())
}
