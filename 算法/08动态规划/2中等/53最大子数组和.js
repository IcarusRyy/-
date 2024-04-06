/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  // dp[i] 代表着以nums[i]结尾的最大子数组和
  // dp[i] = Math.max(nums[i], dp[i - 1] + nums[i])
  if (nums.length < 2) return nums
  let dp = new Array(nums.length).fill(0)
  dp[0] = nums[0]

  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(nums[i], dp[i - 1] + nums[i])
  }
  return Math.max(...dp)
}
