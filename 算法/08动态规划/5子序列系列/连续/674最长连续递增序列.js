/**
 * @param {number[]} nums
 * @return {number}
 */
var findLengthOfLCIS = function (nums) {
  if (!nums.length) return 0
  let dp = new Array(nums.length).fill(1)
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) {
      dp[i] = dp[i - 1] + 1
    }
  }
  return Math.max(...dp)
}

console.log(findLengthOfLCIS([1, 3, 5, 4, 2, 3, 4, 5]))
