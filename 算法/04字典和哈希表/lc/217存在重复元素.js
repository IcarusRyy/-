/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function (nums) {
  // const map = new Map()
  // for (let i = 0; i < nums.length; i++) {
  //   if (map.has(nums[i])) {
  //     return true
  //   }
  //   map.set(nums[i], i)
  // }
  // for (const x of nums) {
  //   if (map.has(x)) {
  //     return true
  //   }
  //   map.set(x, 1)
  // }
  // return false
  const set = new Set()
  for (const x of nums) {
    if (set.has(x)) {
      return true
    }
    set.add(x)
  }
  return false
}
