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

let s1 = new Singleton("data1")
let s2 = new Singleton("data2")
console.log(s1 === s2)
console.log(s1.getData())
console.log(s2.getData())
