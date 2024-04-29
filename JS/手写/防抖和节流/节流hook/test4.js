function useThrottle(val, delay) {
  const [value, setValue] = useState(val)

  const lastRan = useRef(Date.now())

  useEffect(() => {
    let handle
    if (Date.now() - lastRan.current >= delay) {
      setValue(val)
      lastRan.current = Date.now()
    } else {
      handle = setTimeout(() => {
        setValue(val)
        lastRan.current = Date.now()
      }, delay - (Date.now() - lastRan.current))
    }
    return () => clearTimeout(handle)
  }, [val, delay])
  return value
}
