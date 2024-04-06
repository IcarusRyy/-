/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
  let curIndex = 0,
    nextIndex = 0,
    step = 0

  for (let i = 0; i < nums.length; i++) {
    nextIndex = Math.max(nextIndex, i + nums[i])
    if (i === curIndex) {
      curIndex = nextIndex
      step++
    }
  }
  return step
}
