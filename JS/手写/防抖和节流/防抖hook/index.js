import { useState, useEffect } from "react"

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // 设置一个延时
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // 每次value或delay变化时重新设置延时
    // 如果value变化，则清除当前的延时，并重新开始
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay]) // 只有当value或delay变化时，才重新调用

  return debouncedValue
}
export default useDebounce
