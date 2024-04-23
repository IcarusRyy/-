Function.prototype.myCall = function (context = window, ...args) {
  const key = Symbol("key") // 使用Symbol确保不会与context上现有的属性冲突
  console.log(key, "key")
  context[key] = this // 将当前函数作为context的属性
  console.log(this.a, "this")
  console.log(context.test, "text")
  const result = context[key](...args) // 调用函数
  delete context[key] // 移除添加的属性
  return result // 返回结果
}

function greet(greeting, punctuation) {
  console.log(greeting + " " + this.name + punctuation)
}
greet.a = {
  name: "aaa",
}

const person = { name: "John", test: "aaa" }

// call
greet.myCall(person, "Hello", "!") // "Hello John!"
