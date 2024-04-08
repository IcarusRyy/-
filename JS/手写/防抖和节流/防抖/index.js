function myDebounce(fn, wait) {
  let timer = null
  return function () {
    // 如果此时存在定时器的话，则取消之前的定时器重新计时
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    let context = this // 取debounce执行作用域的this
    let args = arguments
    // 设置定时器，使事件间隔指定事件后执行
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, wait)
  }
}
