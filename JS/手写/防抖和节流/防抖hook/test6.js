function useDebounce(val, wait) {
  const [value, setValue] = useState(val)

  useEffect(() => {
    let hanlder = setTimeout(() => setValue(val), wait)

    return () => clearTimeout(hanlder)
  }, [val, wait])

  return value
}
