class Singleton {
  constructor(data) {
    if (Singleton.ins) {
      return Singleton.ins
    }
    Singleton.ins = this
    this.data = data
  }
  getData() {
    return this.data
  }
}

const s1 = new Singleton("s1")
const s2 = new Singleton("s2")
console.log(s1 === s2)
console.log(s1.getData())
console.log(s2.getData())
