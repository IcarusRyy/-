/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function (nums, target) {
  const sum = nums.reduce((a, b) => a + b)
  if ((target + sum) % 2 || Math.abs(target) > sum) return 0
  const left = (target + sum) / 2
  let dp = new Array(left + 1).fill(0)
  dp[0] = 1
  for (let i = 0; i < nums.length; i++) {
    for (let j = left; j >= nums[i]; j--) {
      // 当前总和为j的组合方式数量等于原来不使用nums[i]时的数量（dp[j]）加上新加入nums[i]后能达到总和为j的组合方式数量（dp[j - nums[i]]）
      dp[j] = dp[j] + dp[j - nums[i]]
    }
  }
  return dp[left]
}
