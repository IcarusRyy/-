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
  setData(data) {
    this.data = data
  }
}

const s1 = new Singleton("s1")
const s2 = new Singleton("s2")
console.log(s1 === s2)
