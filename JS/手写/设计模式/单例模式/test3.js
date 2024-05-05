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
