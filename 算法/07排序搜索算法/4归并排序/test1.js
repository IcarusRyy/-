function mergeSort(arr) {
  if (arr.length < 2) return arr

  let mid = Math.floor(arr.length / 2)

  let merge = (left, right) => {
    let result = []
    while (left.length && right.length) {
      result.push(left[0] < right[0] ? left.shit() : right.shit())
    }
  }

  return merge(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid)))
}
