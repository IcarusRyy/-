function useDebounce(val, wait) {
  const [value, setValue] = useState(val)

  useEffect(() => {
    let time = setTimeout(() => {
      setValue(val)
    }, wait)

    return () => clearTimeout(time)
  }, [val, wait])

  return value
}
