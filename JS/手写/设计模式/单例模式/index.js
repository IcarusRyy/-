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

// 使用
const singleton1 = new Singleton("Singleton instance")
const singleton2 = new Singleton("Another value")

console.log(singleton1.getData()) // Singleton instance
console.log(singleton2.getData()) // Singleton instance
console.log(singleton1 === singleton2) // true
