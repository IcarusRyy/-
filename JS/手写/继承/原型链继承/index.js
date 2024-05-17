// 缺点：
// 1 多个实例对象共享了同一个原型，数据污染
// 2 子类无法给父类传参

function Parent() {
  this.name = "父亲"
}

function Child() {
  this.age = 18
}

Child.prototype = new Parent()
const obj = new Child()
console.log(obj.name)
