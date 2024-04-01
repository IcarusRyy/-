var maxProduct = function (nums) {
  if (!nums.length) return 0
  let max = nums[0]
  let min = nums[0]
  let result = max

  for (let i = 1; i < nums.length; i++) {
    let curMax = Math.max(nums[i], nums[i] * max, nums[i] * min)
    let curMin = Math.min(nums[i], nums[i] * max, nums[i] * min)
    result = Math.max(result, curMax)
    max = curMax
    min = curMin
  }
  return result
}

console.log(maxProduct([-2, 3, -2, 4]))
console.log(maxProduct([-2, 3]))
