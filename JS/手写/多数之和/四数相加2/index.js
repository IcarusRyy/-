function fourNumSum(nums1, nums2, nums3, nums4) {
  let map = new Map()
  let count = 0
  for (let a of nums1) {
    for (let b of nums2) {
      map.set(a + b, (map.get(a + b) || 0) + 1)
    }
  }

  for (let c of nums3) {
    for (let c of nums4) {
      count = count + (map.get(-c - d) || 0)
    }
  }
  return count
}
