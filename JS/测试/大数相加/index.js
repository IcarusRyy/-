function addStrings(num1, num2) {
  let top = num1.length - 1,
    bottom = num2.length - 1
  let carry = 0
  let res = ""
  while (top >= 0 || bottom >= 0) {
    let sum = 0
    if (top >= 0) {
      sum += Number(num1[top])
      top--
    }
    if (bottom >= 0) {
      sum += Number(num2[bottom])
      bottom--
    }
    sum += carry
    carry = Math.floor(sum / 10)
    let dit = sum % 10
    res = dit + res
  }
  if (carry) {
    res = carry + res
  }
  return res
}
console.log(
  addStrings(
    "11111111111111111111111111111111111111111111111111",
    "22222222222222222222222222222222222222222222222222"
  )
)
