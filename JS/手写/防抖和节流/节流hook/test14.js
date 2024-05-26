function myThrottle(val, wait) {
  const [value, setValue] = useState(val)

  const lastRunTime = useRef(Date.now())

  useEffect(() => {
    let time = setTimeout(() => {
      if (Date.now() - lastRunTime.current >= delay) {
        setValue(val)
        lastRunTime.current = Date.now()
      }
    }, delay - (Date.now() - lastRunTime.current))
    return () => time
  }, [val, wait])

  return value
}
