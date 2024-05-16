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
// const BigInt = function (str) {
//   // your code here
//   this.value = str.toString()
// }
// BigInt.prototype.plus = function (bigint) {
//   // your code here
//   const str1 = this.value.split("").reverse()
//   const str2 = bigint.value.split("").reverse()
//   const maxLength = Math.max(str1.length, str2.length)
//   let result = []
//   let carry = 0
//   for (let i = 0; i < maxLength; i++) {
//     const sum = (Number(str1[i]) || 0) + (Number(str2[i]) || 0) + carry
//     result[i] = sum % 10
//     carry = Math.floor(sum / 10)
//   }
//   if (carry > 0) {
//     result.push(carry)
//   }
//   return result.reverse().join("")
// }
// BigInt.prototype.toString = function (result) {
//   // your code here
//   return this.value
// }
// const bigint1 = new BigInt("1111111111111111111111111111111111111111")
// const bigint2 = new BigInt("22222222222222222222222222222222222222222222222222")
// console.log(bigint1.plus(bigint2))
