function bigNumSum(str1, str2) {
  let top = str1.length - 1
  let bottom = str2.length - 1

  let res = "",
    carry = 0
  while (top >= 0 || bottom >= 0) {
    let sum = 0
    if (top >= 0) {
      sum += Number(str1[top])
      top--
    }
    if (bottom >= 0) {
      sum += Number(str2[bottom])
      bottom--
    }
    sum += carry
    carry = Math.floor(sum / 10)
    let dit = sum % 10
    res = dit + res
  }
  if (carry > 0) {
    res = carry + res
  }
  return res
}
console.log(
  bigNumSum(
    "11111111111111111111111111111111111111111111111111",
    "22222222222222222222222222222222222222222222222222"
  )
)
