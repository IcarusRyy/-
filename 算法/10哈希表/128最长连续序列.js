var longestConsecutive = function (nums) {
  let map = new Map()

  nums.sort((a, b) => a - b)

  for (let i = 0; i < nums.length; i++) {
    map.set(nums[i], map.get(nums[i] - 1) + 1 || 1)
  }
  let max = 0

  for (const [index, value] of map) {
    max = Math.max(max, value)
  }
  return max
}
