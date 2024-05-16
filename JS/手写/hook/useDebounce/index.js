function useDebounce(val, wait) {
  const [value, setValue] = useState(val)

  useEffect(() => {
    let handle = setTimeout(() => {
      setValue(value)
    }, wait)
    return () => clearTimeout(handle)
  }, [val, wait])

  return value
}
