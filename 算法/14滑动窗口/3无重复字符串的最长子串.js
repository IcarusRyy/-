var lengthOfLongestSubstring = function (s) {
  if (s.length < 2) return s.length

  let left = 0,
    right = 0,
    max = 0

  let set = new Set()

  while (right < s.length) {
    if (!set.has(s[right])) {
      set.add(s[right])
      right++
      max = Math.max(max, right - left)
    } else {
      set.delete(s[left])
      left++
    }
  }
  return max
}

console.log(lengthOfLongestSubstring("!up"))
