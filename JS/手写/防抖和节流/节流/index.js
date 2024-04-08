// 使用时间戳实现。
function myThrottle(fn, delay) {
  let curTime = Date.now()
  return function () {
    let context = this
    let args = arguments
    let nowTime = Date.now()
    // 如果两次时间间隔超过了指定时间，则执行函数
    if (nowTime - curTime >= delay) {
      curTime = Date.now()
      return fn.apply(fn, args)
    }
  }
}
