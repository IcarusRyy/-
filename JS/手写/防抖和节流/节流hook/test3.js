function useThrottle(val, delay) {
  const [value, setValue] = useState(val)
  const lastRan = useRef(Date.now())

  useEffect(() => {
    let handler
    if (Date.now() - lastRan.current >= delay) {
      setValue(val)
      lastRan.current = Date.now()
    } else {
      handler = setTimeout(() => {
        setValue(val)
        lastRan.current = Date.now()
      }, delay - (Date.now() - lastRan.current))
    }
    return () => clearTimeout(handler)
  }, [val, delay])
  return value
}
