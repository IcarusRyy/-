// var canPartition = function (nums) {
//   if (nums.length < 2) return false
//   const sum = nums.reduce((a, b) => a + b)
//   if (sum % 2) return false
//   const target = sum / 2
//   const dp = new Array(target + 1).fill(0)

//   for (let i = 0; i < nums.length; i++) {
//     for (let j = target; j >= nums[i]; j--) {
//       dp[j] = Math.max(dp[j], dp[j - nums[i]] + nums[i])
//       if (dp[j] === target) return true
//     }
//   }
//   return dp[target] === target
// }

// 01 背包问题
// 分割等和子集  就是相当于 和 就是背包 然后从数组里拿元素填充
// 所以要先遍历物品 然后背包从大到小遍历

// dp[i] 表示容量为 i 的背包能装的最大价值  如果最大价值和 子集的和相等 那么就返回true
var canPartition = function (nums) {
  if (nums.length < 2) return false
  let sum = nums.reduce((a, b) => a + b)
  // 如果数组的和 是奇数 就返回false 因为无法分配
  if (sum & 1) return false
  let target = sum / 2

  let dp = new Array(target + 1).fill(0)
  // 递推公式 就是 dp[i] = Math.max(dp[j], dp[j - nums[i]] + nums[i])
  for (let i = 0; i < nums.length; i++) {
    for (let j = target; j >= nums[i]; j--) {
      dp[j] = Math.max(dp[j], dp[j - nums[i]] + nums[i])
    }
  }
  return dp[target] === target
}
