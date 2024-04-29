class Singleton {
  static instance

  constructor(data) {
    if (Singleton.instance) {
      return Singleton.instance
    }
    this.data = data
    Singleton.instance = this
  }
  getData() {
    return this.data
  }
}

const test1 = new Singleton("test1")
const test2 = new Singleton("test2")
console.log(test1 === test2)
console.log(test1.getData())
console.log(test2.getData())
