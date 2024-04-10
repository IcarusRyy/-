function useDebounce(data, wait) {
  const [val, setVal] = useState(data)

  const { run } = useDebounceFn(() => setVal(data), wait)

  useEffect(() => run, [val])

  return val
}
