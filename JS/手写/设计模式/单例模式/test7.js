class Singleton {
  constructor(data) {
    if (Singleton.instance) {
      return Singleton.instance
    }
    Singleton.instance = this
    this.data = data
  }
  getData() {
    return this.data
  }
}

const test1 = new Singleton("test1")
const test2 = new Singleton("test2")

console.log(test1 === test2)
