class LRUCache {
  #map
  #length
  constructor(len) {
    this.#map = new Map()
    this.#length = len
  }
  has(key) {
    return this.#map.has(key)
  }
  get(key) {
    if (!this.#map.has(key)) return
    const value = this.#map.get(key)
    this.#map.delete(key)
    this.#map.set(key, value)
    return value
  }
  set(key, value) {
    if (this.#map.has(key)) {
      this.#map.delete(key)
    }
    this.#map.set(key, value)
    if (this.#map.size >= this.#length) {
      const first = this.#map.keys().next().value
      this.#map.delete(first)
    }
  }
}
