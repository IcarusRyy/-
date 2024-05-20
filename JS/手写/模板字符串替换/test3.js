function parserStr(str, obj) {
  Object.keys(obj).forEach((item) => {
    str = str.replace(new RegExp(`{{${item}}}`, "g"), obj[item])
  })
  return str
}
const str = "{{name}}很厉name害{{name}}，才{{age}}岁"
const obj = { name: "jawil", age: "15" }
console.log(parserStr(str, obj))
