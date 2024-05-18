class Subject {
  constructor() {
    this._observer = []
  }

  subscribe(fn) {
    this._observer.push(fn)
  }

  publish(...args) {
    this._observer.forEach((fn) => fn(...args))
  }
  clear() {
    this._observer = []
  }
}

const test = (val) => console.log(val)
const subject = new Subject()
subject.subscribe(test)
subject.publish("hello")
