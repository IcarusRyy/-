import React, { useRef, useCallback } from "react"

export const useThrottle = (fn, delay = 300) => {
  const timer = useRef()

  return useCallback(() => {
    if (timer.current) {
      return
    }
    timer.current = true
    setTimeout(() => {
      fn()
      time1.current = false
    }, delay)
  }, [delay])
}
