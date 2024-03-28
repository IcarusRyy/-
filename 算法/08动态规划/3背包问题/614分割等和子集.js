var canPartition = function (nums) {
  if (nums.length < 2) return false
  const sum = nums.reduce((a, b) => a + b)
  if (sum % 2) return false
  const target = sum / 2
  const dp = new Array(target + 1).fill(0)

  for (let i = 0; i < nums.length; i++) {
    for (let j = target; j >= nums[i]; j--) {
      dp[j] = Math.max(dp[j], dp[j - nums[i]] + nums[i])
      if (dp[j] === target) return true
    }
  }
  return dp[target] === target
}
