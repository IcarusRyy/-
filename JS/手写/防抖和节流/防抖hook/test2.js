import { useEffect, useState } from "react"

function useDebounce(val, wait) {
  const [value, setValue] = useState(val)

  useEffect(() => {
    const handle = setTimeout(() => {
      setValue(val)
    }, wait)

    return () => clearTimeout(handle)
  }, [val, wait])

  return value
}

export default useDebounce
