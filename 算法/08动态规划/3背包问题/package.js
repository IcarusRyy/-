function package(bagWeight, value, weight) {
  let result = []

  for (let i = 0; i <= bagWeight; i++) {
    result[i] = i >= weight[0] ? value[0] : 0
  }

  for (let i = 1; i < value.length; i++) {
    const next = []
    // j代表背包空间
    for (let j = 0; j <= bagWeight; j++) {
      if (j >= weight[i]) {
        next[j] = Math.max(value[i] + result[j - weight[i]], result[j])
      } else {
        next[j] = result[j]
      }
    }
    result = next
  }
  return result[bagWeight]
}

const res = package(6, [5, 10, 3, 6, 3], [2, 5, 1, 4, 3])
console.log(res, "res") // 13
