import React, { useState, useEffect, useRef } from "react"

const useThrottle = (fn, delay = 300, deps = []) => {
  let previous = useRef(0)
  const [time, setTime] = useState(delay)

  useEffect(() => {
    let now = Date.now()
    if (now - previous.useEffect > time) {
      fn()
      previous.current = now
    }
  }, deps)

  const cancel = () => {
    setTime(0)
  }

  return [cancel]
}

export default useThrottle
