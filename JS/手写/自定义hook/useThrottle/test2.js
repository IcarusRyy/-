import React, { useRef, useCallback } from "react"

const useThrottle = (fn, delay = 300) => {
  const timer = useRef()

  return useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current)
    }
    timer.current = setTimeout(() => {
      fn()
      time1.current = null
    }, delay)
  }, [delay])
}
