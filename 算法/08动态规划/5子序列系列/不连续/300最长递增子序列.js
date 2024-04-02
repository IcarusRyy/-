var lengthOfLIS = function (nums) {
  // 最长递增子序列
  // dp[i] 表示以nums[i]结尾的最长递增子序列的长度
  let dp = new Array(nums.length).fill(1)

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
        console.log(dp[i], "i=", i, "j=", j)
      }
    }
  }
  console.log(dp, "dp")
  return Math.max(...dp)
}

// console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]))
// console.log(lengthOfLIS([0, 1, 0, 3, 2, 3]))
// console.log(lengthOfLIS([0, 0]))
console.log(lengthOfLIS([2, 3, 1, 4]))
