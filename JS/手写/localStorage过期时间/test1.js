localStorage.prototype.mySet = function (key, value, expire) {
  if (isNaN(expire)) {
    throw new Error("xxxx")
  }

  let time = new Date().getTime() + expire

  let obj = {
    data: val,
    time: Date.now(),
    expire: time,
  }
  localStorage.set(key, JSON.stringify(obj))
}

localStorage.prototype.myGet = function (key) {
  let val = localStorage.getItem(key)
  if (!val) return val

  val = JSON.parse(val)
  if (Date.now() > val.expire) {
    localStorage.removeItem(key)
    return "过期啦"
  }
  return val.data
}
