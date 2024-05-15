Function.prototype.myBind = function (context, ...bindArgs) {
  const self = this // 保存原函数
  console.log(this, "aa")
  return function (...callArgs) {
    return self.apply(context, bindArgs.concat(callArgs))
  }
}

function greet(greeting, punctuation) {
  console.log(greeting + " " + this.name + punctuation)
}
greet.a = {
  name: "aaa",
}

const person = { name: "John", test: "aaa" }

// call
greet.myBind(person, "Hello", "!") // "Hello John!"
