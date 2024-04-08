import { useEffect } from "react"

const useDelayedData = (val, wait = 300) => {
  const [data, setData] = useState(val)
  const [tempData, setTempData] = useState(val)

  useEffect(() => {
    const time = setTimeout(() => {
      setData(tempData)
    }, wait)
    return () => {
      clearTimeout(time)
    }
  }, [tempData, wait])

  return [data, setTempData]
}
