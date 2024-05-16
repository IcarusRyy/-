function useThrottle(val, delay) {
  const [value, setValue] = useState(val)
  const lastUpdateTime = useRef(Date.now())

  useEffect(() => {
    let handle = null
    if (Date.now() - lastUpdateTime.current >= delay) {
      setValue(val)
      lastUpdateTime.current = Date.now()
    } else {
      handle = setTimeout(() => {
        setValue(val)
        lastUpdateTime.current = Date.now()
      }, delay - (Date.now() - lastUpdateTime.current))
    }

    return () => clearTimeout(handle)
  }, [val, delay])

  return value
}
