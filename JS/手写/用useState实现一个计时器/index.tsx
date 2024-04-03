import React, { useState, useEffect } from "React"

const Count = () => {
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count + 1)
    }, 1000)

    return () => {
      timer
    }
  }, [count])

  return <h1>{count}</h1>
}
