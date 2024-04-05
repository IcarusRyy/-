var moveZeroes = function (nums) {
  let slow = 0

  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[i] !== 0) {
      let temp = nums[fast]
      nums[fast] = nums[slow]
      nums[slow] = temp
      slow++
    }
  }
  return nums
}
