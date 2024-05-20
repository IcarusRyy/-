function useDebounce(val, wait) {
  const [value, setValue] = useState(val)

  useEffect(() => {
    let handler = setTimeout(() => {
      setValue(val)
    }, wait)
    return () => clearTimer(handler)
  }, [val, wait])

  return value
}
