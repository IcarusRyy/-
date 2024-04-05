/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  let result = []
  nums.sort((a, b) => a - b)

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) return result

    if (i > 0 && nums[i] === nums[i - 1]) continue

    let left = i + 1,
      right = nums.length - 1

    while (left < right) {
      if (nums[i] + nums[left] + nums[right] > 0) {
        right--
      } else if (nums[i] + nums[left] + nums[right] < 0) {
        left++
      } else {
        result.push([nums[i], nums[left], nums[right]])

        while (left < right && nums[left] === nums[left + 1]) {
          left++
        }
        while (left < right && nums[right] === nums[right--]) {
          right--
        }
        left++
        right--
      }
    }
  }
  return result
}
