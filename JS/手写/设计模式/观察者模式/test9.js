class Subject {
  constructor() {
    this._observers = []
  }

  subscribe(fn) {
    this._observers.push(fn)
  }
  publish(val) {
    this._observers.forEach((fn) => fn(val))
  }
  clear() {
    this._observers = []
  }
}

const test = (val) => console.log(val)

const sub = new Subject()
sub.subscribe(test)
sub.publish("hello")
