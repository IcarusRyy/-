class Singleton {
  static instance
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

const s1 = new Singleton("data1")
const s2 = new Singleton("data2")
console.log(s1 === s2)
