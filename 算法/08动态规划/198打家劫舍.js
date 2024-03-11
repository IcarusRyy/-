var rob = function (nums) {
  const length = nums.length
  if (length === 0) return 0

  const dp = [0, nums[0]]

  for (let i = 2; i <= length; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 1])
  }
  return dp[length]
}
