// 先排序 利用递归  降解成 n-1数之和 然后使用双指针

function nSum(nums, target, n) {
  nums.sort((a, b) => a - b)
  let dfs = function (start, target, n) {
    let res = []
    if (n < 2 || n > nums.length) return res
    if (n === 2) {
      // 2数之和 使用双指针求解
      let left = start,
        right = nums.length - 1
      while (left < right) {
        let sum = nums[left] + nums[right]
        if (sum === target) {
          res.push([nums[left], nums[right]])
          while (left < right && nums[left] === nums[left + 1]) left++
          while (left < right && nums[right] === nums[right - 1]) right--
          left++
          right--
        } else if (sum > target) {
          right--
        } else {
          left++
        }
      }
    } else {
      for (let i = start; i < nums.length; i++) {
        let temp = dfs(i + 1, target - nums[i], n - 1)

        for (let item of temp) {
          item.push(nums[i])
          res.push(item)
        }
        while (i < nums.length - 1 && nums[i] === nums[i + 1]) i++ // 去重
      }
    }
    return res
  }
  return dfs(0, target, n)
}

console.log(nSum([1, 2, 3, 4, 5, 6, 7, 8, 9], 9, 3))

function getResult(arr, target, n) {
  let res = []
  let dfs = function (start, path, curSum, count) {
    // 终止条件
    if (curSum === 0 && count === n) {
      res.push([...path])
      return
    }
    for (let i = start; i < arr.length; i++) {
      dfs(i + 1, [...path, arr[i]], curSum - arr[i], count + 1)
    }
    return
  }
  dfs(0, [], target, 0)
  return res
}
console.log(getResult([1, 2, 3, 4, 5, 6, 7, 8, 9], 9, 3))

function nSum2(data, target, n) {
  let res = []
  let dfs = function (start, path, curSum, count) {
    if (count === n && curSum === 0) {
      res.push([...path])
      return
    }

    for (let i = start; i < data.length; i++) {
      dfs(i + 1, [...path, data[i]], curSum - data[i], count + 1)
    }
  }
  dfs(0, [], target, 0)
  return res
}
console.log(nSum2([1, 2, 3, 4, 5, 6, 7, 8, 9], 9, 3))
