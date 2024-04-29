function useDebounce(val, wait) {
  const [value, setValue] = useState(val)

  useEffect(() => {
    let handle = setTimeout(() => setValue(val), wait)

    return () => clearTimeout(handle)
  }, [value, wait])

  return value
}
