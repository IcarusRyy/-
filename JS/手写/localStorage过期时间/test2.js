localStorage.prototype.mySet = function (key, value, expire) {
  let time = new Date().getTime() + expire

  let obj = {
    data: value,
    expire: time,
  }

  localStorage.setItem(key, JSON.stringify(obj))
}

localStorage.prototype.myGet = function (key) {
  let val = localStorage.getItem(key)
  if (!val) return val

  if (Date.now() > val.expire) {
    localStorage.removeItem(key)
    return "过期啦"
  }
  return JSON.parse(val).data
}
