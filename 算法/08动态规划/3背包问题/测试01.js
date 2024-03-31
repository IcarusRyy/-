// var weight = [3, 4] // 物品的重量
// var value = [4, 5] // 物品的价值
// var capacity = 5 // 背包的最大容量

// // // 初始化dp数组，数组长度为背包容量加1
// var dp = new Array(capacity + 1).fill(0)

// // 遍历每个物品
// for (let i = 0; i < weight.length; i++) {
//   // 倒序遍历背包容量
//   for (let j = capacity; j >= weight[i]; j--) {
//     dp[j] = Math.max(dp[j], dp[j - weight[i]] + value[i])
//     console.log(dp[j], "j")
//   }
// }

// dp[capacity]
// console.log(dp, "dp")
// // console.log(dp[capacity]) // 输出最大价值

// // var weight = [3, 4];  // 物品的重量
// // var value = [4, 5];   // 物品的价值
// // var capacity = 5;     // 背包的最大容量

// // 初始化dp数组，数组长度为背包容量加1
// var dps = new Array(capacity + 1).fill(0)
// let weights = [3, 2]
// let values = [4, 3]
// // 遍历每个物品
// for (let i = 0; i < weights.length; i++) {
//   for (let j = weights[i]; j <= capacity; j++) {
//     dps[j] = Math.max(dps[j], dps[j - weights[i]] + values[i])
//     console.log(dps) // 查看每个物品处理后dp数组的变化
//   }
// }
// console.log(dps, "dps")
// // console.log(dps[capacity]) // 输出最大价值

var coinChange = function (coins, amount) {
  // 考虑到递推公式的特性，dp[j]必须初始化为一个最大的数，否则就会在min(dp[j - coins[i]] + 1, dp[j])比较的过程中被初始值覆盖。
  // 这是始终都不会超过amount+1 所以可以保证在递推公式当中 不被初始值覆盖
  let dp = new Array(amount + 1).fill(amount + 1)
  dp[0] = 0
  for (let i = 0; i < coins.length; i++) {
    for (let j = coins[i]; j <= amount; j++) {
      dp[j] = Math.min(dp[j], dp[j - coins[i]] + 1)
      console.log(dp[j], dp[j - coins[i]], "a")
      console.log(dp, "dp")
    }
  }
  console.log(dp[amount])
  return dp[amount] === amount + 1 ? -1 : dp[amount]
}

coinChange([2], 3)
