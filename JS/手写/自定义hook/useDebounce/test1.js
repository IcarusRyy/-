import React, { useEffect, useRef } from "react"

const useDebounce = (fn, wait = 300, deps = []) => {
  const timer = useRef()

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current)

      timer.current = setTimeout(() => {
        fn()
      }, wait)
    }
  }, deps)

  const cancel = () => {
    clearInterval(timer.current)
    timer = null
  }

  return [cancel]
}

export default useDebounce
