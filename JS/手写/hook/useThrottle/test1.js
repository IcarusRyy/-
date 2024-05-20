function useThrottle(val, delay) {
  const [value, setValue] = useState(val)
  const lastUpdateTime = useRef(Date.now())

  useEffect(() => {
    let handler = null
    if (Date.now() - lastUpdateTime.current >= delay) {
      setValue(val)
      lastUpdateTime.current = Date.now()
    } else {
      handler = setTimeout(() => {
        setValue(val)
        lastUpdateTime.current = Date.now()
      }, delay - (Date.now() - lastUpdateTime.current))
    }
    return () => clearTimeout(handler)
  }, [val, delay])

  return value
}
