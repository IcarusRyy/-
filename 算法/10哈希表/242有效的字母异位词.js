var isAnagram = function (s, t) {
  if (s.length !== t.length) return false
  let arr = new Array(26).fill(0)

  for (let i = 0; i < s.length; i++) {
    arr[s.charCodeAt(i) - "a".charCodeAt(0)]++
    arr[t.charCodeAt(i) - "a".charCodeAt(0)]--
  }

  for (const item of arr) {
    if (item) return false
  }
  return true
}
