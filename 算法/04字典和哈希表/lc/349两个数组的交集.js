/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
// var intersection = function (nums1, nums2) {
//   const result = new Set()
//   const set = new Set(nums1)

//   for (const x of nums2) {
//     if (set.has(x)) {
//       result.add(x)
//     }
//   }
//   return Array.from(result)
// }

var intersection = function (nums1, nums2) {
  const set = new Set(nums1)
  return [...new Set(nums2)].filter((item) => set.has(item))
}
