import { useEffect } from "react"

function myDebounce(val, wait) {
  const [value, setValue] = useState(val)

  useEffect(() => {
    let handler = setTimeout(() => {
      setValue(val)
    }, wait)
    return () => clearTimeout(handler)
  }, [val, wait])

  return value
}
