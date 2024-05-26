import { useEffect } from "react"

function myThrottle(val, delay) {
  const [value, setValue] = useState(val)
  const lastRunTime = useRef(Date.now())

  useEffect(() => {
    let time = null
    if (Date.now() - lastRunTime.current >= delay) {
      setValue(val)
      lastRunTime.current = Date.now()
    } else {
      time = setTimeout(() => {
        setValue(val)
        lastRunTime.current = Date.now()
      }, delay - (Date.now() - lastRunTime.current))
    }
    return () => clearTimeout(time)
  }, [val, delay])

  return value
}
