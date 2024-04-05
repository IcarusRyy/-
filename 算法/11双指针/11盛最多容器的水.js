/**
 * @param {number[]} height
 * @return {number}
 */
// 比如移动短板， 如果移动高板的话 盛水一定会减少   移动短板 有可能会增加
var maxArea = function (height) {
  let left = 0,
    right = height.length - 1

  let result = 0

  while (left < right) {
    if (height[left] < height[right]) {
      let res = (right - left) * Math.min(height[left], height[right])
      result = Math.max(result, max)
    }

    if (height[left] <= height[right]) {
      left++
    } else {
      right--
    }
    return result
  }
}
