import { useState, useEffect, useRef } from "react"

function useThrottle(value, limit) {
  // 创建一个内部状态来保存节流值
  const [throttledValue, setThrottledValue] = useState(value)
  // 使用 useRef 来保存一个标记，这标记用于判断是否允许下一次函数执行
  const lastRan = useRef(Date.now())

  useEffect(() => {
    // 定时器变量
    let handler
    if (Date.now() - lastRan.current >= limit) {
      // 如果已经达到或超过了指定的时间间隔，则立即更新节流值
      // 并重置时间标记
      setThrottledValue(value)
      lastRan.current = Date.now()
    } else {
      // 如果还没有达到指定的时间间隔，设置一个定时器，在剩余时间后更新节流值
      handler = setTimeout(() => {
        setThrottledValue(value)
        lastRan.current = Date.now()
      }, limit - (Date.now() - lastRan.current))
    }

    // 清理函数：在组件卸载或者值/时间间隔更新时，清除定时器
    return () => {
      clearTimeout(handler)
    }
  }, [value, limit]) // 仅当输入值或节流间隔时间更新时，才重新执行

  return throttledValue
}

export default useThrottle
