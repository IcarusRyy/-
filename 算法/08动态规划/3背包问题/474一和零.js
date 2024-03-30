var findMaxForm = function (strs, m, n) {
  const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0))
  for (const str of strs) {
    const zeros = str.split("").filter((item) => item === "0").length
    const ones = str.length - zeros
    for (let i = m; i >= zeros; i--) {
      for (let j = n; j >= ones; j--) {
        dp[i][j] = Math.max(dp[i][j], dp[i - zeros][j - ones] + 1)
      }
    }
  }
  return dp[m][n]
}

// var findMaxForm = function (strs, m, n) {
//     // 创建一个 (m+1) x (n+1) 的二维数组，因为包括从 0 到 m 和 0 到 n 的情况
//     const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0))

//     for (let str of strs) {
//         let numOfZeros = 0
//         let numsOfOnes = 0
//         for (let s of str) {
//             if (s === '0') {
//                 numOfZeros++
//             } else {
//                 numsOfOnes++
//             }
//         }

//         for (let i = m; i >= numOfZeros; i--) {
//             for (let j = n; j >= numsOfOnes; j--) {
//                 dp[i][j] = Math.max(dp[i][j], dp[i - numOfZeros][j - numsOfOnes] + 1)
//             }
//         }
//     }
//     return dp[m][n]
// };
