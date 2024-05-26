class EventEmitter {
  constructor() {
    this._listeners = {}
  }

  on(type, fn) {
    if (!this._listeners[type]) {
      this._listeners[type] = []
    }
    this._listeners[type].push(fn)
  }

  emit(type, ...args) {
    if (this._listeners[type]) {
      this._listeners[type].forEach((fn) => fn(...args))
    }
  }

  off(type, fn) {
    if (!this._listeners[type]) return
    this._listeners[type] = this._listeners[type].filter((f) => f !== fn)
  }
}
