// N数之和 思路
// 先排序 然后双指针

function threeSum(nums) {
  nums.sort((a, b) => a - b)

  let res = []

  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] > 0) return res
    // 去重逻辑
    if (i > 0 && nums[i] === nums[i - 1]) continue
    let left = i + 1,
      right = nums.length - 1
    while (left < right) {
      let sum = nums[i] + nums[left] + nums[right]

      if (sum === 0) {
        res.push([nums[i], nums[left], nums[right]])
        // 去重逻辑
        while (left < right && nums[left] === nums[left + 1]) left++
        while (left < right && nums[right] === nums[right - 1]) right--

        left++
        right--
      } else if (sum > 0) {
        right--
      } else {
        left++
      }
    }
  }
  return res
}

console.log(threeSum([-1, 0, 1, 2, -1, -4]))
